"use strict";
var Fireworks;
(function (Fireworks) {
    //Find elements with interactive features
    let colorpicker;
    let sizepicker;
    let custombutton;
    let savebutton;
    let savedbutton;
    let savedlist;
    let canvas;
    let crc2;
    //booleans to determine if costumized settings want to be tested
    let custombuttonclicked;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("handleLoad");
        // custombutton = <HTMLButtonElement>document.querySelector("#custombutton");
        // custombutton.addEventListener("click", toggleTest);
        savebutton = document.querySelector("#savebutton");
        savebutton.addEventListener("click", saveFirework);
        // savedbutton = <HTMLButtonElement>document.querySelector("#savedbutton");
        //savedbutton.addEventListener("click", toggleTest);
        savedlist = document.querySelector("div#saved");
        savedlist.addEventListener("click", chooseSaved);
        canvas = document.querySelector("#sky");
        canvas.addEventListener("click", fireRocket);
        crc2 = canvas.getContext("2d");
        crc2.fillStyle = "rgb(0,35,102)";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        setInterval(drawBackground, 300);
        custombuttonclicked = true;
    }
    function drawBackground() {
        crc2.fillStyle = "rgba(0,35,102, 0.5)";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function saveFirework() {
        console.log("saveFirework");
    }
    function fireRocket(_event) {
        let customs = getCustoms();
        //get position of click
        let x = _event.offsetX;
        let y = _event.offsetY;
        crc2.save();
        crc2.scale(customs[1], customs[1]);
        if (customs[1] == 2) {
            x = x / 2;
            y = y / 2;
        }
        else if (customs[1] == 3) {
            x = x / 3;
            y = y / 3;
        }
        drawFirework(x, y, customs[0]);
        crc2.restore();
    }
    function drawFirework(_x, _y, _color) {
        crc2.strokeStyle = _color;
        crc2.fillStyle = _color;
        let innerpath = new Path2D();
        innerpath.arc(_x, _y, 3.5, 0, 2 * Math.PI);
        let middlepath = new Path2D();
        middlepath.ellipse(_x, _y - 24, 5, 14, 0, 0, 2 * Math.PI);
        let outerpath = new Path2D();
        outerpath.ellipse(_x, _y - 60, 6, 18, 0, 0, 2 * Math.PI);
        crc2.save();
        for (let i = 0; i < 10; i++) {
            crc2.stroke(innerpath);
            crc2.fill(innerpath);
            crc2.stroke(middlepath);
            crc2.fill(middlepath);
            crc2.stroke(outerpath);
            crc2.fill(outerpath);
            crc2.translate(_x, _y);
            crc2.rotate(40 * Math.PI / 180);
            crc2.translate(-_x, -_y);
        }
        crc2.restore();
    }
    function getCustoms() {
        colorpicker = document.querySelector("input#colorpicker");
        let customcolor = colorpicker.value;
        sizepicker = document.querySelector("input#sizepicker");
        let customsize = parseFloat(sizepicker.value);
        return [customcolor, customsize];
    }
    function chooseSaved(_event) {
    }
    function displayList() {
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map