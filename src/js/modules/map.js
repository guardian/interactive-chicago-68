var L = require('leaflet');

var map, currentData = '';

module.exports =  {
    init: function() {
        this.createMap();
        this.bindings();
    },

    createMap: function() {
        var startingData = $('.uit-media__map').parent().find('.has-map').first().data('map');
        var bounds = this.dataToBounds(startingData);
        var maxBounds = L.latLngBounds(L.latLng(41.7780, -87.7168), L.latLng(41.9830, -87.5321));

        map = L.map('uit-media__map', {
            center: bounds.getCenter(),
            maxBounds: maxBounds,
            maxBoundsViscosity: 1.0,
            zoom: 13,
            zoomControl: false,
            minZoom: 12,
            maxZoom: 14,
            zoomSnap: 0
        });

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();

        var image = L.imageOverlay('{{ path }}/assets/chicago.svg', maxBounds);
            image.getAttribution = function() { return '&copy; OpenStreetMap' }
            image.addTo(map);

        this.addMarker(41.81698, -87.64573, 'International Amphitheater');
        this.addMarker(41.91407, -87.62973, 'Lincoln Park');
        this.addMarker(41.87415, -87.62080, 'Grant Park');
        this.addMarker(41.87259, -87.62472, 'Conrad Hilton');
    },

    bindings: function() {
        $(window).resize(function() {
            map.flyToBounds(this.dataToBounds(currentData));
        }.bind(this));
    },

    updateMap: function(data) {
        if (data !== currentData && map) {
            currentData = data;

            map.flyToBounds(this.dataToBounds(data.map), {
                duration: 1,
                animate: true
            });

            $('.uit-media__map-marker').removeClass('is-focus');

            if (typeof data.labels === 'string') {
                data.labels = data.labels.split(', ');
            }

            for (var label in data.labels) {
                $('.uit-media__map-marker--' + data.labels[label]).addClass('is-focus');
            }
        }
    },

    dataToBounds: function(data) {
        data = data.split(', ');
        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);
        data[2] = parseFloat(data[2]);
        data[3] = parseFloat(data[3]);

        var northEast = new L.latLng(data[0], data[1]);
        var southWest = new L.latLng(data[2], data[3]);
        var bounds = new L.latLngBounds(southWest, northEast);

        return bounds;
    },

    addMarker: function(lat, lng, title) {
        L.marker(new L.LatLng(lat, lng), {
            icon: new L.DivIcon({
                className: 'uit-media__map-marker uit-media__map-marker--' + title.toLowerCase().replace(/ /g, '-'),
                html: '<div class="uit-media__map-label"><span class="uit-media__map-label__inner">' + title + '</span></div>'
            })
        }).addTo(map);
    }
};
