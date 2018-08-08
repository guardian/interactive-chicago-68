var L = require('leaflet');

var accessToken = 'pk.eyJ1Ijoic2FtbW9ycmlzMTIiLCJhIjoiY2pnM3gwMGZmMjNubjJ3cDk1dXB2aDlkcyJ9.C_WFHWBdqpXAZCAijwSnYQ';

module.exports =  {
    init: function() {
        this.createMap();
    },

    createMap: function() {
        var map = L.map('uit-media__map', {
            center: [41.8666, -87.5923],
            zoom: 13,
            zoomControl: false,
            attributionControl: false
        });

        var layer = L.tileLayer('https://api.mapbox.com/styles/v1/sammorris12/cjg3x2nfp79wx2rmusxzi63ir/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
            maxZoom: 18
        });

        layer.addTo(map);
    }
};
