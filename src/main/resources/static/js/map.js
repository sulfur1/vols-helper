let polyLine = null;
let line = null;
let draw = null;
let form = null;

// undo event of keypress 'ctrl + z'
document.onkeydown = KeyPress;

$(function () {
    form = $('#addLine');
    line = new Line();
});

class Line {
    constructor() {
        this._coordinates = [];
    }

    get coordinates() {
        return this._coordinates;
    }

    set coordinates(value) {
        this._coordinates = value;
    }
}

function openMap() {
    if (draw === null) {
        $("#addMap").append("<div id=\"map\"></div>");
        let idMap = document.getElementById('map');
        draw = getMap([59.9386, 30.3141], idMap, draw);
    }
    new bootstrap.Modal($("#modalAddMap")).show();
}

function closeMap() {
    /*draw = null;*/
}
function pencil() {
    L.DomUtil.addClass(draw._container, 'crosshair-cursor-enabled');
    polyLine = L.polyline(line._coordinates, {color: 'red'}).addTo(draw);
    draw.on('click', function (e) {
        let coord = e.latlng;
        let lat = coord.lat;
        let lng = coord.lng;
        if (line._coordinates.length < 1) {
            pushCoordinates(lat, lng, line);
        } else {
            pushCoordinates(lat, lng, line);
            redraw();

// zoom the map to the polyline
            //draw.fitBounds(polyline.getBounds());
        }
    });
}

function redraw() {
    polyLine.setLatLngs(line._coordinates);
}

function undo() {
    if (line._coordinates.length > 0) {
        line._coordinates.pop();
        redraw();
    }
}
function KeyPress(e) {
    let evtobj = window.event? event : e
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) undo();
}
function pushCoordinates(lat, lng, line) {
    let arr = line._coordinates;
    arr.push([lat, lng]);
    line._coordinates = arr;
    return line;
}
function getForm() {
    return form;
}

