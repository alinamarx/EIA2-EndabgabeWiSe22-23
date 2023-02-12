namespace Fireworks {
    export async function generateList(_data: DataEntries): Promise<void> {
        savedlist.innerHTML = ""

        let entries: any[] = [];

        for (let entry in _data.data) {
            entries.push(entry);
        }

        for (let entryID of entries) {
            let entry: Rocket = _data.data[entryID];

            let id = entry.ID;
            let size = entry.Size;
            let color = entry.Color;

            let breakElement: HTMLSpanElement = document.createElement("span");
            breakElement.innerHTML = "<br>";

            let listElement: HTMLButtonElement = document.createElement("button");
            listElement.innerHTML = "Size: " + size + " & Color: " + color + "<br>";
            listElement.setAttribute("id", id);
            listElement.setAttribute("size", size);
            listElement.setAttribute("color", color);

            savedlist.appendChild(listElement);
            savedlist.appendChild(breakElement);

            listElement.addEventListener("click", function () {
                changeSettings(size, color);
            });
        }
    }

    function changeSettings(_size: string, _color: string): void {
        sizepicker.value = _size;
        colorpicker.value = _color;
    }

    export async function saveRocket(_event: Event): Promise<void> {

        form = <HTMLFormElement>document.querySelector("#form");
        formData = new FormData(form);
        json = {}

        for (let key of formData.keys()) {
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        }

        let query: URLSearchParams = new URLSearchParams;
        query.set("command", "insert");
        query.set("collection", "Rockets");
        query.set("data", JSON.stringify(json))

        await fetch (url + query.toString());
        alert("Rocket saved!");

        generateList(data);
    }

}