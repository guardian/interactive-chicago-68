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
            maxBounds: new L.bounds([41.7743, -87.7427], [41.9357, -87.5261]),
            center: startingData.bounds,
            zoom: startingData.zoom,
            zoomControl: false,
        });

//         maps[id].control.addAttribution('&copy; OpenStreetMaps');

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
        imageBounds = [[41.7780, -87.7168], [41.9830, -87.5321]];

        var image = L.imageOverlay(imageUrl, imageBounds);
            image.getAttribution = function() { return '&copy; OpenStreetMap' }
            image.addTo(maps[id]);

        this.addMarker(id, 41.81698, -87.64573, 'International Amphitheater');
        this.addMarker(id, 41.91407, -87.62973, 'Lincoln Park');
        this.addMarker(id, 41.87259, -87.62472, 'Hilton Chicago');
        this.addMarker(id, 41.87415, -87.62080, 'Grant Park');
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
    },

    addMarker: function(id, lat, lng, title) {
        L.marker(new L.LatLng(lat, lng), {
            icon: new L.DivIcon({
                className: 'uit-media__map-marker',
                html: '<div class="uit-media__map-label"><span class="uit-media__map-label__inner">' + title + '</span></div>'
            })
        }).addTo(maps[id]);
    }
};
