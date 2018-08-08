var L = require('leaflet');

var map;
var accessToken = 'pk.eyJ1Ijoic2FtbW9ycmlzMTIiLCJhIjoiY2pnM3gwMGZmMjNubjJ3cDk1dXB2aDlkcyJ9.C_WFHWBdqpXAZCAijwSnYQ';

module.exports =  {
    init: function() {
        this.createMap();
    },

    createMap: function() {
        map = L.map('uit-media__map', {
            center: [41.8666, -87.5923],
            zoom: 14
        });

        var layer = L.tileLayer('https://api.mapbox.com/styles/v1/sammorris12/cjg3x2nfp79wx2rmusxzi63ir/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
            maxZoom: 18
        });

        layer.addTo(map);
    },

    updateMap: function(data) {
        data = data.split(', ');
        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);
        data[2] = parseInt(data[2]);
        console.log(data);
        map.flyTo(new L.LatLng(data[0], data[1]), data[2]);
    }
};
