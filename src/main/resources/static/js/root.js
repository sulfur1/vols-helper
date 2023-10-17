let show = null;
function makeEditable(datatableOpts) {
    ctx.dataTableApi = $("#datatable").DataTable(
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
 * Кнопка показа карты линии в таблице.
 * @param data
 * @param type
 * @param row
 * @returns {string}
 */
function renderMapBtn(data, type, row) {
    if (type === "display") {
        return "<a onclick='showMap();'><span class='fa fa-map'></span></a>";
    }
}
/**
 * Кнопка редактирования линии в таблице.
 * @param data
 * @param type
 * @param row
 * @returns {string}
 */
function renderEditBtn(data, type, row) {
    if (type === "display") {
        return "<a onclick='updateRow(" + row.id + ");'><span class='fa fa-pencil'></span></a>";
    }
}

function updateRow(id) {

}

function modal() {
    let m = new bootstrap.Modal($("#modalMap"));
    m.show();
}


function save() {
    document.getElementById("coordinates").value = JSON.stringify(line._coordinates);
    $.ajax({
        type: "POST",
        url: "/admin/line",
        data: getForm().serialize()
    }).done(function () {

    });
}

/**
 * Показ карты в модальном окне
 */


function showMap() {
    let coord;
    let lat;
    let lng;
    if (show === null) {
        $("#showMap").append("<div id=\"map\"></div>");
        let idMap = document.getElementById('map');
        show = getMap([59.9386, 30.3141], "dsd", idMap, show);
        show.on('click', function(e){
            coord = e.latlng;
            lat = coord.lat;
            lng = coord.lng;
            console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
        });
    }
    modal();
}

/**
 * Создание карты
 * @param position - позиция при создании.
 * @param tooltip - название метки.
 * @param idMap
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

function failNoty(jqXHR) {
    closeNoty();
    let errorInfo = jqXHR.responseJSON;
    failedNote = new Noty({
        text: "<span class='fa fa-lg fa-exclamation-circle'></span> &nbsp;" + ": " + jqXHR.status +
            "<br>" + errorInfo.type + "<br>" + errorInfo.details.join("<br>"),
        type: "error",
        layout: "bottomRight"
    });
    failedNote.show()
}