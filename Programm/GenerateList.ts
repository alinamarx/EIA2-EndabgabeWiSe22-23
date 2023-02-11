namespace Fireworks {

    export function generateList(_data: Data): void {
        savedlist.innerHTML = ""
        console.log("generate list")
        console.log(_data);


        for (let rocket in _data.Rockets) {
            console.log(rocket);

            let size = _data.Rockets[rocket].size;
            let color = _data.Rockets[rocket].color;

            String(size);

            let listElement: HTMLSpanElement = document.createElement("span");
            listElement.setAttribute("size", size);
            listElement.setAttribute("color", color);

            savedlist.appendChild(listElement);

            listElement.addEventListener("click", function() {
                changeSettings(size, color);
            });

        }
    }

    function changeSettings(_size: number, _color: string): void {

        colorpicker.value = _color;
        sizepicker.value = _size;
    }

}