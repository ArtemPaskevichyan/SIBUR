window.onload = function() {

    var markers_array = [[43, 39], [44, 39]];
    var features;
    var geojson;

    mapboxgl.accessToken = 'pk.eyJ1IjoieXl5YXNoIiwiYSI6ImNrcGNncWt6OTE5ZTkyb3Q3OG5hMG85aDkifQ.hnhxUbd6VyLT0HJUzcvosg'; // Токен

    var map = new mapboxgl.Map({                        // Создание и настройки карты
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [39.964975, 43.399896], // начальная позиция [lng, lat]
        zoom: 15                        // начальное увеличение
    });

    map.doubleClickZoom.disable();                              // убрать приближение при двойном нажатии
    map.touchZoomRotate.disableRotation();                      // отключить вращение карт

    function addMarker(mlat, mlng) {                      // Добавление маркеров

        var markSt = document.createElement('div');
        markSt.className = 'marker';

        marker = new mapboxgl.Marker(markSt,{
            color: "#000000",
            draggable: false
        }).setLngLat([mlng, mlat]).addTo(map);
    }

    map.on('mousemove', function(e) {                   // записать информацию в info
        document.getElementById('info').innerHTML = e.lngLat.wrap();
        mcoords = e.lngLat.wrap();
    });

    // addMarkerFromArray();

    function addMarkerFromArray(){
        for (var i = 0; i < markers_array.length; i++) {
            var lat = markers_array[i][0];
            var lng = markers_array[i][1];
            addMarker(lat, lng);
        }
    }

    function addPopup(mlat, mlng){
        var popup = new mapboxgl.Popup({ closeOnClick: false }).setLngLat([lng, mlat]).setHTML('<h1>Hello World!</h1>').addTo(map);
    }

    function toGeojson(){
        features = {
                        "type": "Feature",
                        "properties": {
                          "description": "<strong>Make it Mount Pleasant</strong>",
                          "icon": "leave"
                        },
                        "geometry": {
                          "type": "Point",
                          "coordinates": [39.964975, 43.399896]
                        }
                };

                geojson = {
                  "type": "geojson",
                  "data": {
                    "type": "FeatureCollection",
                    "features": [features]
                  }
                };

                console.log(geojson)
    }

    toGeojson();

    map.on('load', function () {

        map.loadImage('https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Tree-256.png', function(error, image){
            if (error) throw error;
            map.addImage('leave', image);
        });

        map.addSource('places', geojson); 

    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-size': 0.25,
            'icon-image': '{icon}',
            'icon-allow-overlap': true
        }
    });

    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});

}






// Documentation: https://docs.mapbox.com/mapbox-gl-js/api/markers/