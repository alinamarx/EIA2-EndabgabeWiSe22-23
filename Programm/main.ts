/*
Aufgabe: Endabgabe WiSe22/23 – Feuerwerk
Name: Alina Marx
Matrikel: 269481
Datum: 12.02.23
Quellen: w3schools.com, stackoverflow.com EIA-Inverted classroom
*/

namespace Fireworks {

    let savebutton: HTMLButtonElement;
    export let form: HTMLFormElement;
    export let sizepicker: HTMLInputElement;
    export let colorpicker: HTMLInputElement;
    export let savedlist: HTMLDivElement;
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    export let url: string
    export let data: DataEntries;
    export let formData: FormData;
    export let json: FormDataJSON;

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    export interface Rocket {
        Size: string;
        Color: string;
    }
    export interface DataEntries {
        [category: string]: Rocket[];
    }


    window.addEventListener("load", handleLoad)


    async function handleLoad(_event: Event): Promise<void> {

        //Daten von Server abrufen bevor das Programm weiter läuft

        url = "https://webuser.hs-furtwangen.de/~marxalin/Database/?"
        let query: URLSearchParams = new URLSearchParams
        query.set("command", "find");
        query.set("collection", "Rockets");

        let response: Response = await fetch(url + query.toString());
        let list: string = await response.text();
        data = JSON.parse(list);

        sizepicker = <HTMLInputElement>document.querySelector("input#sizepicker");
        colorpicker = <HTMLInputElement>document.querySelector("input#colorpicker");
        savebutton = <HTMLButtonElement>document.querySelector("#savebutton");
        savedlist = <HTMLDivElement>document.querySelector("div#saved");

        canvas = <HTMLCanvasElement>document.querySelector("#sky");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        if (!canvas)
            return;

        canvas.addEventListener("click", prepareRocket);
        savebutton.addEventListener("click", saveRocket);

        crc2.fillStyle = "rgba(2, 25, 69, 1)";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        setInterval(drawBackground, 300);

        generateList(data);
    }

    export function drawBackground(): void {
        crc2.fillStyle = "rgba(2, 25, 69, 0.5)";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }



}