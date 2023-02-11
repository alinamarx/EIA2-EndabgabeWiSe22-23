namespace Fireworks {

//Find elements with interactive features
let form: HTMLFormElement
export let colorpicker: HTMLInputElement 
export let sizepicker: HTMLInputElement
let savebutton: HTMLButtonElement
export let savedlist: HTMLDivElement
let canvas: HTMLCanvasElement
let crc2: CanvasRenderingContext2D

window.addEventListener("load", handleLoad)


async function handleLoad (_event: Event): Promise<void> {

    //Daten von Server abrufen bevor das Programm weiter läuft

    /*let response: Response = await fetch ("Data.json");
    let list: string = await response.text();
    let data: Data = JSON.parse(list);    
    console.log(data)*/ 

    savebutton = <HTMLButtonElement>document.querySelector("#savebutton");
    savebutton.addEventListener("click", saveFirework);
    form = <HTMLFormElement>document.querySelector("#form");
    savedlist = <HTMLDivElement>document.querySelector("div#saved");
    canvas = <HTMLCanvasElement>document.querySelector("#sky");
    canvas.addEventListener("click", fireRocket);

    colorpicker = <HTMLInputElement>document.querySelector("input#colorpicker");
    sizepicker = <HTMLInputElement>document.querySelector("input#sizepicker");

    if (!canvas)
        return;

    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.fillStyle = "rgb(0,35,102)";
    crc2.fillRect(0, 0, canvas.width, canvas.height);

    generateList(data);

    setInterval(drawBackground, 300); 
} 

function drawBackground(): void {
    crc2.fillStyle = "rgba(0,35,102, 0.5)";
    crc2.fillRect(0, 0, canvas.width, canvas.height);
}

async function saveFirework (_event: Event): Promise<void> {
    console.log("saveFirework");
    let formData: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams (<any>formData);
    await fetch ("fireworks.html?" + query.toString());
    alert("Order sent!");
}

function fireRocket (_event: MouseEvent): void {

    let customs: [string, number] = getCustoms();

    //get position of click
    let x: number = _event.offsetX;
    let y: number = _event.offsetY; 

    crc2.save();
    crc2.scale(customs[1], customs[1]);

    if (customs[1] == 2) {
        x = x / 2;
        y = y / 2;
    } else if (customs[1] == 3) {
        x = x / 3;
        y = y / 3;
    }
    
    drawFirework(x, y, customs[0]);

    crc2.restore();
    
}

function drawFirework (_x: number, _y: number, _color: string): void {

    crc2.strokeStyle = _color;
    crc2.fillStyle = _color;

    let innerpath: Path2D = new Path2D();
    innerpath.arc(_x, _y, 3.5, 0, 2 * Math.PI);
    let middlepath: Path2D = new Path2D();
    middlepath.ellipse(_x,_y - 24, 5, 14, 0, 0, 2 * Math.PI);
    let outerpath: Path2D = new Path2D();
    outerpath.ellipse(_x, _y - 60, 6, 18, 0, 0, 2 * Math.PI);

    crc2.save();

    for (let i: number = 0; i < 10; i++) {

        crc2.stroke(innerpath);
        crc2.fill(innerpath);
        crc2.stroke(middlepath);
        crc2.fill(middlepath);
        crc2.stroke(outerpath);
        crc2.fill(outerpath);
        
        crc2.translate(_x, _y); 
        crc2.rotate( 40 * Math.PI / 180); 
        crc2.translate(-_x,-_y); 

    }

    crc2.restore();
}

function getCustoms (): [string, number] {
    let customcolor: string = colorpicker.value

    let customsize: number = parseFloat(sizepicker.value)
    
    return [customcolor, customsize]
}


}