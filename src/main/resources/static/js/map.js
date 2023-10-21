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

    get coordinates() {
        return this._points;
    }

    set coordinates(value) {
        this._points = value;
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

function pencil(typePoint) {
    L.DomUtil.addClass(draw._container, 'crosshair-cursor-enabled');
    if (polyLine === null) {
        polyLine = L.polyline([], {color: 'red'}).addTo(draw);
    }
    draw.on('click', function (e) {
        let coord = e.latlng;
        let lat = coord.lat;
        let lng = coord.lng;
        if (line._points.length < 1) {
            pushCoordinates(lat, lng, typePoint);
        } else {
            pushCoordinates(lat, lng, typePoint);
            redraw();

// zoom the map to the polyline
            //draw.fitBounds(polyline.getBounds());
        }
    });
}

function undo() {
    if (line._points.length > 0) {
        line._points.pop();
        let removeMarker = line._markers.pop();
        removeMarker.onRemove(draw);
        redraw();
    }
}

function redraw() {
    let coordinates = [];
    line._points.forEach((point) => {
        coordinates.push([point._lat, point._lng]);
    })
    polyLine.setLatLngs(coordinates);
}

function pushCoordinates(lat, lng, typePoint) {
    let newPoint = new Point(lat, lng, typePoint);
    let newMarker = L.marker([lat, lng], {draggable: true}).addTo(draw);
    newMarker.on('drag', function(e){
        line.setLatLngs([newMarker.getLatLng(), newMarker.getLatLng()]);
    });
    line._points.push(newPoint);
    line._markers.push(newMarker);
}


function getForm() {
    return form;
}
// undo event of keypress 'ctrl + z'
document.onkeydown = KeyPress;
function KeyPress(e) {
    let evtobj = window.event? event : e
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) undo();
}

