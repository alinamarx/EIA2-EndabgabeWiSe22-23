"use strict";
var Fireworks;
(function (Fireworks) {
    async function generateList(_data) {
        Fireworks.savedlist.innerHTML = "";
        let entries = [];
        for (let entry in _data.data) {
            entries.push(entry);
        }
        for (let entryID of entries) {
            let entry = _data.data[entryID];
            let id = entry.ID;
            let size = entry.Size;
            let color = entry.Color;
            let breakElement = document.createElement("span");
            breakElement.innerHTML = "<br>";
            let listElement = document.createElement("button");
            listElement.innerHTML = "Size: " + size + " & Color: " + color + "<br>";
            listElement.setAttribute("id", id);
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
        Fireworks.sizepicker.value = _size;
        Fireworks.colorpicker.value = _color;
    }
    async function saveRocket(_event) {
        Fireworks.form = document.querySelector("#form");
        Fireworks.formData = new FormData(Fireworks.form);
        Fireworks.json = {};
        for (let key of Fireworks.formData.keys()) {
            if (!Fireworks.json[key]) {
                let values = Fireworks.formData.getAll(key);
                Fireworks.json[key] = values.length > 1 ? values : values[0];
            }
        }
        let query = new URLSearchParams;
        query.set("command", "insert");
        query.set("collection", "Rockets");
        query.set("data", JSON.stringify(Fireworks.json));
        await fetch(Fireworks.url + query.toString());
        alert("Rocket saved!");
        generateList(Fireworks.data);
    }
    Fireworks.saveRocket = saveRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=Data.js.map