let polyLine = null;
let line = null;
let draw = null;
let form = null;

$(function () {
    form = $('#addLine');
    line = new Line();
});

const typePoint = {BASE:'base', COUPLING:'coupling'}

class Line {
    constructor() {
        this._points = [];
        this._markers = [];
    }


    get points() {
        return this._points;
    }

    set points(value) {
        this._points = value;
    }

    get markers() {
        return this._markers;
    }

    set markers(value) {
        this._markers = value;
    }
}

class Point {
    constructor(lat, lng, typePoint) {
        this._lat = lat;
        this._lng = lng;
        this._typePoint = typePoint;
    }

    get lat() {
        return this._lat;
    }

    set lat(value) {
        this._lat = value;
    }

    get lng() {
        return this._lng;
    }

    set lng(value) {
        this._lng = value;
    }

    get typePoint() {
        return this._typePoint;
    }

    set typePoint(value) {
        this._typePoint = value;
    }
}
function openMap() {
    let coord = form.find("input[name='coordinates']").val();
    console.log(coord);
    if (draw === null) {
        $("#addMap").append("<div id=\"map\"></div>");
        let idMap = document.getElementById('map');
        draw = getMap([59.9386, 30.3141], idMap, draw);
    }

    new bootstrap.Modal($("#modalAddMap")).show();
}

function pencil() {
    L.DomUtil.addClass(draw._container, 'crosshair-cursor-enabled');
    if (polyLine === null) {
        polyLine = L.polyline([], {color: 'red'}).addTo(draw);
    }
    draw.on('click', eventClick);
}
const radioBase = document.getElementById("radioBase");
function eventClick(e) {
    let type;
    if (radioBase.checked) {
        type = typePoint.BASE;
    } else {
        type = typePoint.COUPLING;
    }
    let coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    if (line._markers.length < 1) {
        pushCoordinates(lat, lng, type);
    } else {
        pushCoordinates(lat, lng, type);
        redraw();
    }
}

function undo() {
    if (line._points.length > 0) {
        line._points.pop();
        let removeMarker = line._markers.pop();
        removeMarker.onRemove(draw);
        redraw();
    }
}

function select() {
    L.DomUtil.removeClass(draw._container, 'crosshair-cursor-enabled');
    draw.off('click', eventClick);
}

function redraw() {
    let coordinates = [];
    line._markers.forEach((marker) => {
        coordinates.push(marker.getLatLng());
    })
    polyLine.setLatLngs(coordinates);
}

function pushCoordinates(lat, lng, type) {
    let newPoint = new Point(lat, lng, type);
    let newMarker;
    if (type === typePoint.BASE) {
        newMarker = L.marker([lat, lng], markerOptionsBase).addTo(draw);
    } else {
        newMarker = L.marker([lat, lng], markerOptionsCoupling).addTo(draw);
    }
    newMarker.on('dragend', function(e) {
        let marker = e.target;
        let position = marker.getLatLng();
        newMarker.setLatLng([position.lat, position.lng]);
        redraw();
    });
    line._points.push(newPoint);
    line._markers.push(newMarker);
}


function getForm() {
    return form;
}
function getLine() {
    return line;
}
// undo event of keypress 'ctrl + z'
document.onkeydown = KeyPress;
function KeyPress(e) {
    let evtobj = window.event? event : e
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) undo();
}

