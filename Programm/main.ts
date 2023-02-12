namespace Fireworks {

let form: HTMLFormElement;
export let sizepicker: HTMLInputElement;
export let colorpicker: HTMLInputElement;

let savebutton: HTMLButtonElement;
export let savedlist: HTMLDivElement;
let data: Data;

export let canvas: HTMLCanvasElement;
export let crc2: CanvasRenderingContext2D;


let url: string 
let formData: FormData;
let json: FormDataJSON;


interface FormDataJSON {
    [key: string]: FormDataEntryValue | FormDataEntryValue[];
}

export interface Rocket {
    size: string;
    color: string;
}
export interface Data {
    Rockets: Rocket[];
}



window.addEventListener("load", handleLoad)


async function handleLoad (_event: Event): Promise<void> {

    form = <HTMLFormElement>document.querySelector("#form");
    formData = new FormData(form);
    json = {}

    for (let key of formData.keys()) {
        if (!json[key]) {
          let values: FormDataEntryValue[] = formData.getAll(key);
          json[key] = values.length > 1 ? values : values[0];
        }
    }

    console.log(json);

    //Daten von Server abrufen bevor das Programm weiter läuft

    url = "https://webuser.hs-furtwangen.de/~marxalin/Database/?"
    let response: Response = await fetch (url);
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

export async function generateList(_data: Data): Promise<void> {
    savedlist.innerHTML = ""

    let query: URLSearchParams = new URLSearchParams();
    query.set("command", "find");
    query.set("collection", "Rockets");

    let response: Response = await fetch(url + query.toString());
    let responseText: string = await response.text();
    console.log("Response Text: " + responseText);

    let entries: Rocket = [];

    for (let rocket in _data.Rockets) {
    
        let size = _data.Rockets[rocket].size;
        let color = _data.Rockets[rocket].color;

        let breakElement: HTMLSpanElement = document.createElement("span");
        breakElement.innerHTML = "<br>";

        let listElement: HTMLButtonElement = document.createElement("button");
        listElement.innerHTML = "Size: " + size + " & Color: " + color + "<br>";
        listElement.setAttribute("size", size);
        listElement.setAttribute("color", color);

        savedlist.appendChild(listElement);
        savedlist.appendChild(breakElement);
        console.log(savedlist);

        listElement.addEventListener("click", function() {
            changeSettings(size, color);
        });
    }
}

function changeSettings(_size: string, _color: string): void {
    sizepicker.value = _size;
    colorpicker.value = _color;
}

async function saveRocket (_event: Event): Promise<void> {

    let query: URLSearchParams = new URLSearchParams();
    query.set("command", "insert");
    query.set("collection", "Rockets");
    query.set("data", JSON.stringify(json));

    await fetch (url + query.toString());
    alert("Rocket saved!");
    

    generateList(data);
}


}