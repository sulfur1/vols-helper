let polyLine = null;
let line = null;
let show = null;
let showId;
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

function openMap(id) {
    if (show === null) {
        showId = id - 1;
        line = new Line();
        let p = dataTableApi.cell(showId, 6).data();
        line._points = JSON.parse(p);

        $("#showMap").append("<div id=\"map\"></div>");
        let idMap = document.getElementById('map');
        show = getMap([59.9386, 30.3141],  idMap, show);

        let coordinates = [];
        line._points.forEach((point) => {
            coordinates.push([point._lat, point._lng]);
            let marker;
            if (point._typePoint === typePoint.BASE) {
                marker = L.marker([point._lat, point._lng], markerOptionsBase).addTo(show);
            } else {
                marker = L.marker([point._lat, point._lng], markerOptionsCoupling).addTo(show);
            }
            line._markers.push(marker);
        });
        polyLine = L.polyline(coordinates, {color: 'red'}).addTo(show);
    } else {
        if (showId !== id) {
            clear();
            showId = id - 1;
            let p = dataTableApi.cell(showId, 6).data();
            line._points = JSON.parse(p);
            let coordinates = [];
            line._points.forEach((point) => {
                coordinates.push([point._lat, point._lng]);
                let marker;
                if (point._typePoint === typePoint.BASE) {
                    marker = L.marker([point._lat, point._lng], markerOptionsBase).addTo(show);
                } else {
                    marker = L.marker([point._lat, point._lng], markerOptionsCoupling).addTo(show);
                }
                line._markers.push(marker);
            });
            polyLine = L.polyline(coordinates, {color: 'red'}).addTo(show);
        }
    }
    new bootstrap.Modal($("#modalShowMap")).show();
}
function clear() {
    polyLine.remove(show);
    line._markers.forEach(marker => (marker.remove(show)));
    line._points = null;

}