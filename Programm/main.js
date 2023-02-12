"use strict";
/*
Aufgabe: Endabgabe WiSe22/23 – Feuerwerk
Name: Alina Marx
Matrikel: 269481
Datum: 12.02.23
Quellen: w3schools.com, stackoverflow.com EIA-Inverted classroom
*/
var Fireworks;
(function (Fireworks) {
    let savebutton;
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        //Daten von Server abrufen bevor das Programm weiter läuft
        Fireworks.url = "https://webuser.hs-furtwangen.de/~marxalin/Database/?";
        let query = new URLSearchParams;
        query.set("command", "find");
        query.set("collection", "Rockets");
        let response = await fetch(Fireworks.url + query.toString());
        let list = await response.text();
        Fireworks.data = JSON.parse(list);
        Fireworks.sizepicker = document.querySelector("input#sizepicker");
        Fireworks.colorpicker = document.querySelector("input#colorpicker");
        savebutton = document.querySelector("#savebutton");
        Fireworks.savedlist = document.querySelector("div#saved");
        Fireworks.canvas = document.querySelector("#sky");
        Fireworks.crc2 = Fireworks.canvas.getContext("2d");
        if (!Fireworks.canvas)
            return;
        Fireworks.canvas.addEventListener("click", Fireworks.prepareRocket);
        savebutton.addEventListener("click", Fireworks.saveRocket);
        Fireworks.crc2.fillStyle = "rgba(2, 25, 69, 1)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
        setInterval(drawBackground, 300);
        Fireworks.generateList(Fireworks.data);
    }
    function drawBackground() {
        Fireworks.crc2.fillStyle = "rgba(2, 25, 69, 0.5)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.canvas.width, Fireworks.canvas.height);
    }
    Fireworks.drawBackground = drawBackground;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map