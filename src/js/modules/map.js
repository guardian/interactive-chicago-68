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
        var startingData = $('#' + id).parent().find('.has-map').first().data('map');
            startingData = this.dataToFormats(startingData);

        maps[id] = L.map(id, {
            maxBounds: [[41.6910, -87.8373], [42.0025, -87.4288]],
            center: startingData.bounds,
            zoom: startingData.zoom
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
        if (data !== currentData && maps[id]) {
            currentData = data;

            maps[id].flyTo(this.dataToFormats(data).bounds, this.dataToFormats(data).zoom);
        }
    },

    dataToFormats: function(data) {
        data = data.split(', ');
        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);
        data[2] = parseInt(data[2]);

        return {
            bounds: new L.LatLng(data[0], data[1]),
            zoom: data[2]
        };
    } 
};
