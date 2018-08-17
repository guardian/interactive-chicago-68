var L = require('leaflet');

var map, currentData = '';

module.exports =  {
    init: function() {
        this.createMap();
    },

    createMap: function() {
        map = L.map('uit-media__map', {
            center: [41.8666, -87.5923],
            zoom: 14
        });

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) {
            map.tap.display();
        }

        var imageUrl = '{{ path }}/assets/chicago.svg',
        imageBounds = [[41.6910, -87.8373], [42.0025, -87.4288]];

        L.imageOverlay(imageUrl, imageBounds).addTo(map);
    },

    updateMap: function(data) {
        if (data !== currentData) {
            currentData = data;

            data = data.split(', ');
            data[0] = parseFloat(data[0]);
            data[1] = parseFloat(data[1]);
            data[2] = parseInt(data[2]);
            map.flyTo(new L.LatLng(data[0], data[1]), data[2]);
        }
    }
};
