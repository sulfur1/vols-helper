let form;
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
    /*$("#modal").on('shown', renderMap);*/
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
/*function renderMap() {
    let map = getMap([59.9386, 30.3141], "Tol")
    $(".modal-body").append(map);
}*/
function modal() {
    let m = new bootstrap.Modal($("#modalMap"));
    m.show();
}

/**
 * Показ карты в модальном окне
 */
let map = null;
let idMap = null;

function showMap() {
    let coord;
    let lat;
    let lng;
    if (map === null) {
        $(".modal-body").append("<div id=\"show_map\"></div>");
        getMap([59.9386, 30.3141], "dsd");
        map.on('click', function(e){
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
 */
function getMap(position, tooltip) {
    // если карта не была инициализирована
    if (map === null) {
        idMap = document.getElementById('show_map');
        // второй аргумент, принимаемый методом setView - это масштаб (zoom)
        map = L.map(idMap).setView(position, 10)
    } else return

    // Реклама
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // resize
    L.marker(position).addTo(map).bindPopup(tooltip).openPopup()
    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });

    resizeObserver.observe(idMap);
}