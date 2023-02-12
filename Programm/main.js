"use strict";
var Fireworks;
(function (Fireworks) {
    let form;
    let savebutton;
    let data;
    let url;
    let formData;
    let json;
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        form = document.querySelector("#form");
        formData = new FormData(form);
        json = {};
        for (let key of formData.keys()) {
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        }
        console.log(json);
        //Daten von Server abrufen bevor das Programm weiter läuft
        url = "https://webuser.hs-furtwangen.de/~marxalin/Database/?";
        let response = await fetch(url);
        let list = await response.text();
        data = JSON.parse(list);
        Fireworks.sizepicker = document.querySelector("input#sizepicker");
        Fireworks.colorpicker = document.querySelector("input#colorpicker");
        savebutton = document.querySelector("#savebutton");
        Fireworks.savedlist = document.querySelector("div#saved");
        Fireworks.canvas = document.querySelector("#sky");
        Fireworks.crc2 = Fireworks.canvas.getContext("2d");
        if (!Fireworks.canvas)
            return;
        Fireworks.canvas.addEventListener("click", Fireworks.prepareRocket);
        savebutton.addEventListener("click", saveRocket);
        Fireworks.crc2.fillStyle = "rgba(2, 25, 69, 1)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
        setInterval(drawBackground, 300);
        generateList(data);
    }
    function drawBackground() {
        Fireworks.crc2.fillStyle = "rgba(2, 25, 69, 0.5)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
    }
    Fireworks.drawBackground = drawBackground;
    async function generateList(_data) {
        Fireworks.savedlist.innerHTML = "";
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Rockets");
        let response = await fetch(url + query.toString());
        let responseText = await response.text();
        console.log("Response Text: " + responseText);
        let entries = [];
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
            console.log(Fireworks.savedlist);
            listElement.addEventListener("click", function () {
                changeSettings(size, color);
            });
        }
    }
    Fireworks.generateList = generateList;
    function changeSettings(_size, _color) {
        Fireworks.sizepicker.value = _size;
        Fireworks.colorpicker.value = _color;
    }
    async function saveRocket(_event) {
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Rockets");
        query.set("data", JSON.stringify(json));
        await fetch(url + query.toString());
        alert("Rocket saved!");
        generateList(data);
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map