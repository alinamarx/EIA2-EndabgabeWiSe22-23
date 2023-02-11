namespace Fireworks {

let form: HTMLFormElement;
export let sizepicker: HTMLInputElement;
export let colorpicker: HTMLInputElement;

let savebutton: HTMLButtonElement;
export let savedlist: HTMLDivElement;

export let canvas: HTMLCanvasElement;
export let crc2: CanvasRenderingContext2D;


window.addEventListener("load", handleLoad)


async function handleLoad (_event: Event): Promise<void> {

    //Daten von Server abrufen bevor das Programm weiter läuft

    /*let response: Response = await fetch ("Data.json");
    let list: string = await response.text();
    let data: Data = JSON.parse(list);    
    console.log(data)*/ 

    form = <HTMLFormElement>document.querySelector("#form");
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

    crc2.fillStyle = "rgb(65,76,107)";
    crc2.fillRect(0, 0, canvas.width, canvas.height);
    setInterval(drawBackground, 300);

    generateList(data);
} 

export function drawBackground(): void {
    crc2.fillStyle = "rgba(2, 25, 69, 0.5)";
    crc2.fillRect(0, 0, canvas.width, canvas.height);
}

export function generateList(_data: Data): void {
    savedlist.innerHTML = ""

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
    console.log("save Rocket");
    let formData: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams (<any>formData);
    await fetch ("fireworks.html?" + query.toString());
    alert("Order sent!");

    generateList(data);
}


}