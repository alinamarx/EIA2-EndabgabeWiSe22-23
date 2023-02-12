"use strict";
var Fireworks;
(function (Fireworks) {
    function prepareRocket(_event) {
        let customs = getSettings();
        //get position of click
        let x = _event.offsetX;
        let y = _event.offsetY;
        Fireworks.crc2.save();
        Fireworks.crc2.scale(customs[0], customs[0]);
        Fireworks.crc2.strokeStyle = customs[1];
        Fireworks.crc2.fillStyle = customs[1];
        if (customs[0] == 2) {
            x = x / 2;
            y = y / 2;
        }
        else if (customs[0] == 3) {
            x = x / 3;
            y = y / 3;
        }
        drawFirework(x, y);
        Fireworks.crc2.restore();
    }
    Fireworks.prepareRocket = prepareRocket;
    function getSettings() {
        let customsize = parseFloat(Fireworks.sizepicker.value);
        let customcolor = Fireworks.colorpicker.value;
        return [customsize, customcolor];
    }
    function drawFirework(_x, _y) {
        let innerpath = new Path2D();
        let middlepath = new Path2D();
        let outerpath = new Path2D();
        innerpath.arc(_x, _y, 3.5, 0, 2 * Math.PI);
        middlepath.ellipse(_x, _y - 24, 5, 14, 0, 0, 2 * Math.PI);
        outerpath.ellipse(_x, _y - 60, 6, 18, 0, 0, 2 * Math.PI);
        Fireworks.crc2.save();
        for (let i = 0; i < 10; i++) {
            Fireworks.crc2.stroke(innerpath);
            Fireworks.crc2.fill(innerpath);
            Fireworks.crc2.stroke(middlepath);
            Fireworks.crc2.fill(middlepath);
            Fireworks.crc2.stroke(outerpath);
            Fireworks.crc2.fill(outerpath);
            Fireworks.crc2.translate(_x, _y);
            Fireworks.crc2.rotate(40 * Math.PI / 180);
            Fireworks.crc2.translate(-_x, -_y);
        }
        Fireworks.crc2.restore();
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=fireRockets.js.map