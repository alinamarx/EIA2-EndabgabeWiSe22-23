namespace Fireworks {

    export function prepareRocket(_event: MouseEvent): void {

        let customs: [number, string] = getSettings();

        //get position of click
        let x: number = _event.offsetX;
        let y: number = _event.offsetY;

        crc2.save();

        crc2.scale(customs[0], customs[0]);
        crc2.strokeStyle = customs[1];
        crc2.fillStyle = customs[1];

        if (customs[0] == 2) {
            x = x / 2;
            y = y / 2;
        } else if (customs[0] == 3) {
            x = x / 3;
            y = y / 3;
        }

        drawFirework(x, y);

        crc2.restore();
    }

    function getSettings(): [number, string] {

        let customsize: number = parseFloat(sizepicker.value)
        let customcolor: string = colorpicker.value

        return [customsize, customcolor]
    }

    function drawFirework(_x: number, _y: number): void {

        let innerpath: Path2D = new Path2D();
        let middlepath: Path2D = new Path2D();
        let outerpath: Path2D = new Path2D();

        innerpath.arc(_x, _y, 3.5, 0, 2 * Math.PI);
        middlepath.ellipse(_x, _y - 24, 5, 14, 0, 0, 2 * Math.PI);
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
            crc2.rotate(40 * Math.PI / 180);
            crc2.translate(-_x, -_y);

        }

        crc2.restore();
    }

}