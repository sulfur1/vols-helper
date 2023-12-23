let dataTableApi;
function makeEditable(datatableOpts) {
        dataTableApi = $("#datatable").DataTable(
        {
            ...datatableOpts, // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            "ajax": {
                "url": ctx.ajaxUrl,
                "dataSrc": ""
            },
            "paging": false,
            "info": true
        }
    );

    $(document).ajaxError(function (event, jqXHR, options, jsExc) {
        failNoty(jqXHR);
    });

}

/**
 * Кнопка показа карты линии.
 * @param data
 * @param type
 * @param row
 * @returns {string}
 */
function renderMapBtn(data, type, row) {
    if (type === "display") {
        return "<a type='button' onclick='openMap(" + row.id + ");'><span class='fa fa-map'></span></a>";
    }
}
/**
 * Кнопка удаления линии.
 * @param data
 * @param type
 * @param row
 * @returns {string}
 */
function renderDeleteBtn(data, type, row) {
    if (type === "display") {
        return "<a type='button' onclick='deleteRow(" + row.id + ");'><span class='fa fa-close'></span></a>";
    }
}
/**
 * Кнопка редактирования линии.
 * @param data
 * @param type
 * @param row
 * @returns {string}
 */
function renderEditBtn(data, type, row) {
    if (type === "display") {
        return "<a type='button' href='/lines/" + row.id + "/update'><span class='fa fa-pencil'></span></a>";
    }
}
function deleteRow(id) {
    let result = confirm("Вы действительно хотите удалить эту линию?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: "/lines/" + id
        }).done(successNoty);
    }
}
/*function updateRow(id) {
    let form = getForm();
    form.find(":input").val("");
    $.get("/lines/" + id, function (data) {
        $.each(data, function (key, value) {
            form.find("input[name='" + key + "']").val(value);
        });
    });
}*/

function save() {
    let points = getLine()._points;
    document.getElementById("coordinates").value = JSON.stringify(points);
    $.ajax({
        type: "POST",
        url: "/lines",
        data: getForm().serialize()
    }).done(successNoty);
}

/**
 * Создание карты
 * @param position - позиция при создании.
 * @param idMap
 * @param map
 */
function getMap(position, idMap, map) {
    // если карта не была инициализирована
    if (map === null) {
        // второй аргумент, принимаемый методом setView - это масштаб (zoom)
        map = L.map(idMap).setView(position, 10)
    } else return

    // Реклама
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    /*// resize
    L.marker(position).addTo(map).bindPopup(tooltip).openPopup()*/
    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });

    resizeObserver.observe(idMap);

    return map;
}
let failedNote;
function closeNoty() {
    if (failedNote) {
        failedNote.close();
        failedNote = undefined;
    }
}

function successNoty() {
    new Noty({
        text: "<span class='fa fa-lg fa-light fa-circle-check'></span>",
        type: "success",
        layout: "bottomRight"
    }).show();
}
function failNoty(jqXHR) {
    closeNoty();
    let errorInfo = jqXHR.responseJSON;
    failedNote = new Noty({
        text: "<span class='fa fa-lg fa-exclamation-circle'></span> &nbsp;" + ": " + jqXHR.status +
            "<br>" + errorInfo.type + "<br>" + errorInfo.details.join("<br>"),
        type: "error",
        layout: "bottomRight"
    });
    failedNote.show();
}