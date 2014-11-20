// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

// Advanced Optional Steps (AOS)

"use strict";

$(document).ready(function() {

    var mapElem = document.getElementById('map');

    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var mapOption = {
        center: center,
        zoom: 14
    };


    var map = new google.maps.Map(mapElem, mapOption);

    // AOS - Custom Marker Image
    var image = 'https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/search_pointer.png';

    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            data.forEach(function(camera) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map,
                    // AOS - Custom Marker Image
                    icon: image,
                    animation: google.maps.Animation.DROP
                })

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + camera.cameralabel + '</h2>';
                    // adding more content to html
                    html += '<img src="' + camera.imageurl.url + '"/>';
                    // how to append it to the window
                    infoWindow.setContent(html);
                    // how to show it on the map
                    infoWindow.open(map, this);
                    map.panTo(this.getPosition());
                });

                $('#search').bind('search keyup', function() {
                    var searchKey = $('#search');
                    var cameraVal = camera.cameralabel;
                    var value = cameraVal.toLowerCase().indexOf(searchKey.val().toLowerCase());
                    if (value >= 0) {
                        marker.setMap(map)
                    } else {
                        marker.setMap(null);
                    }
                });

                // AOS - Close InfoWindow
                google.maps.event.addListener(map, 'click', function() {
                   infoWindow.close();
                });

            });
        })
        .fail(function(error) {
            alert(error);
        })
        .always(function() {

        });

    // AOS - Resize
    $(window).resize(function() {
        var position = $('#map').position();
        $('#map').height($(window).height() - position.top - 20);

    });









});


//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

