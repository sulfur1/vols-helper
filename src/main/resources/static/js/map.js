
class Line {

    constructor(name, length, diameter, from, to) {
        // вызывает сеттер
        this._length = length;
        this._diameter = diameter;
        this._from = from;
        this._to = to;
        this._name = name;
        this._lineGeoJson = {
            "type": "Feature",
            "properties": {
                "name": this._name,
                "amenity": "Baseball Stadium",
                "popupContent": "This is where the Rockies play!"
            },
            "geometry": {
                "type": "Point",
                "coordinates": []
            }
        };
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

    get diameter() {
        return this._diameter;
    }

    set diameter(value) {
        this._diameter = value;
    }

    get from() {
        return this._from;
    }

    set from(value) {
        this._from = value;
    }

    get to() {
        return this._to;
    }

    set to(value) {
        this._to = value;
    }

    get lineGeoJson() {
        return this._lineGeoJson;
    }

    set lineGeoJson(value) {
        this._lineGeoJson = value;
    }
}

function parseCoordinates(lineGeoJson) {
    let arr = JSON.parse(lineGeoJson).lineGeoJson;

    return arr;
}
