var L = require('leaflet');

var maps = [],
    currentData = '';

module.exports =  {
    init: function() {
        this.createMaps();
    },

    createMaps: function() {
        $('.uit-media__map').each(function(i, el) {
            this.createMap($(el).attr('id'))
        }.bind(this));
    },

    createMap: function(id) {
        maps[id] = L.map(id, {
            center: [41.8666, -87.5923],
            zoom: 14
        });

        maps[id].dragging.disable();
        maps[id].touchZoom.disable();
        maps[id].doubleClickZoom.disable();
        maps[id].scrollWheelZoom.disable();
        maps[id].boxZoom.disable();
        maps[id].keyboard.disable();
        if (maps[id].tap) {
            maps[id].tap.display();
        }

        var imageUrl = '{{ path }}/assets/chicago.svg',
        imageBounds = [[41.6910, -87.8373], [42.0025, -87.4288]];

        L.imageOverlay(imageUrl, imageBounds).addTo(maps[id]);
    },

    updateMap: function(id, data) {
        console.log(id);
        if (data !== currentData) {
            currentData = data;

            data = data.split(', ');
            data[0] = parseFloat(data[0]);
            data[1] = parseFloat(data[1]);
            data[2] = parseInt(data[2]);
            maps[id].flyTo(new L.LatLng(data[0], data[1]), data[2]);
        }
    }
};
