/*
'rest/admin/image/basecoordinate'
*/
let iconBaseOptions = {
    iconUrl: '/img/basecoordinate.png',
    iconSize: [10, 10],
    cache: true
}
let iconCouplingOptions = {
    iconUrl: '/img/couplingcoordinate.png',
    iconSize: [25, 25],
    cache: true
}
let customBaseIcon = L.icon(iconBaseOptions);
let customCouplingIcon = L.icon(iconCouplingOptions);

const markerOptionsBase = {
    icon: customBaseIcon,
    draggable: true
}
const markerOptionsCoupling = {
    icon: customCouplingIcon,
    draggable: true
}
