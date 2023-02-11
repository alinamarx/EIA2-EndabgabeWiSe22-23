"use strict";
var Fireworks;
(function (Fireworks) {
    let form;
    let savebutton;
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        //Daten von Server abrufen bevor das Programm weiter läuft
        /*let response: Response = await fetch ("Data.json");
        let list: string = await response.text();
        let data: Data = JSON.parse(list);
        console.log(data)*/
        form = document.querySelector("#form");
        Fireworks.sizepicker = document.querySelector("input#sizepicker");
        Fireworks.colorpicker = document.querySelector("input#colorpicker");
        savebutton = document.querySelector("#savebutton");
        Fireworks.savedlist = document.querySelector("div#saved");
        Fireworks.canvas = document.querySelector("#sky");
        Fireworks.crc2 = Fireworks.canvas.getContext("2d");
        if (!Fireworks.canvas)
            return;
        Fireworks.canvas.addEventListener("click", Fireworks.prepareRocket);
        savebutton.addEventListener("click", saveFirework);
        Fireworks.crc2.fillStyle = "rgb(65,76,107)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
        setInterval(drawBackground, 300);
        generateList(Fireworks.data);
    }
    function drawBackground() {
        Fireworks.crc2.fillStyle = "rgba(2, 25, 69, 0.5)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
    }
    Fireworks.drawBackground = drawBackground;
    function generateList(_data) {
        Fireworks.savedlist.innerHTML = "";
        for (let rocket in _data.Rockets) {
            let size = _data.Rockets[rocket].size;
            let color = _data.Rockets[rocket].color;
            let breakElement = document.createElement("span");
            breakElement.innerHTML = "<br>";
            let listElement = document.createElement("button");
            listElement.innerHTML = "Size: " + size + " & Color: " + color + "<br>";
            listElement.setAttribute("size", size);
            listElement.setAttribute("color", color);
            Fireworks.savedlist.appendChild(listElement);
            Fireworks.savedlist.appendChild(breakElement);
            listElement.addEventListener("click", function () {
                changeSettings(size, color);
            });
        }
    }
    Fireworks.generateList = generateList;
    function changeSettings(_size, _color) {
        Fireworks.colorpicker.value = _color;
        Fireworks.sizepicker.value = _size;
    }
    async function saveFirework(_event) {
        console.log("saveFirework");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        await fetch("fireworks.html?" + query.toString());
        alert("Order sent!");
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map