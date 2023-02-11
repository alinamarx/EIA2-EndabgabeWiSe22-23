"use strict";
var Fireworks;
(function (Fireworks) {
    function generateList(_data) {
        Fireworks.savedlist.innerHTML = "";
        console.log("generate list");
        console.log(_data);
        for (let rocket in _data.Rockets) {
            console.log(rocket);
            let size = _data.Rockets[rocket].size;
            let color = _data.Rockets[rocket].color;
            String(size);
            let listElement = document.createElement("span");
            listElement.setAttribute("size", size);
            listElement.setAttribute("color", color);
            Fireworks.savedlist.appendChild(listElement);
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
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=GenerateList.js.map