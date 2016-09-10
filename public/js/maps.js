//Data
var cities = [];
// = [
//               {
//                 "address": "Wisma Academy\n4A, Jalan 19/1",
//                 "city": "Petaling Jaya",
//                 "country": "Malaysia",
//                 "postalCode": "46300",
//                 "long": 101.6278914,
//                 "lat": 3.1120654
//               }, {
//                 "address": "The Boulevard\nMid Valley City, Lingkaran Syed Putra",
//                 "city": "Kuala Lumpur",
//                 "country": "Malaysia",
//                 "postalCode": "59200",
//                 "long": 101.667495,
//                 "lat": 3.100753
//               }, {
//                 "address": "Vertical Business Suite II, \nAvenue 3, Bangsar South, \nNo.8, Jalan Kerinchi,",
//                 "city": "Kuala Lumpur",
//                 "country": "Malaysia",
//                 "postalCode": "59200",
//                 "long": 101.6634711,
//                 "lat": 3.1105239
//               }, {
//                 "address": "Oval Damansara,\nNo.685, Jalan Damansara,\nSprint Highway,",
//                 "city": "Kuala Lumpur",
//                 "country": "Malaysia",
//                 "postalCode": "60000",
//                 "long": 101.6289193,
//                 "lat": 3.1320123
//               }, {
//                 "address": "Jalan Pandan Cahaya 1/2\nPandan Cahaya\nSelangor Darul Ehsan",
//                 "city": "Ampang",
//                 "country": "Malaysia",
//                 "postalCode": "68000",
//                 "long": 101.7549664,
//                 "lat": 3.1384067
//               }, {
//                 "address": "Aljunied Rd, \nCititech Industrial Building,",
//                 "city": "Singapore",
//                 "country": "Singapore",
//                 "postalCode": "389838",
//                 "long": 103.879393,
//                 "lat": 1.325676
//               }, {
//                 "address": "CTI Tower, 191/11-12 Ratchadaphisek Road\nKhwaeng Klongtoey, Khet Klongtoey,",
//                 "city": "Bangkok",
//                 "country": "Thailand",
//                 "postalCode": "10110",
//                 "long": 100.583109,
//                 "lat": 13.708034
//               }, {
//                 "address": "HITTC building, 185 Gang Vo, Dong Da, Hanoi",
//                 "city": "Hanoi",
//                 "country": "Viet Nam",
//                 "long": 105.7810633,
//                 "lat": 21.0361061
//               }, {
//                 "address": "Van Bao str., Ba Dinh dist.,",
//                 "city": "Hanoi",
//                 "country": "Viet Nam",
//                 "long": 105.8148791,
//                 "lat": 21.0321657
//               }
//           ];

          //Angular App Module and Controller
          var sampleApp = angular.module('mapsApp', []);
          sampleApp.controller('MapCtrl', function ($scope, $http) {
              $http.get("/api/location")
                .then(function(response) {
                    cities = response.data;
                    var mapOptions = {
                        zoom: 4,
                        center: new google.maps.LatLng(0,0),
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    }

                    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    var infoWindow = new google.maps.InfoWindow({map: $scope.map});
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent('current Location found.');
                        $scope.map.setCenter(pos);
                      }, function() {
                        handleLocationError(true, infoWindow, $scope.map.getCenter());
                      });
                    } else {
                      // Browser doesn't support Geolocation
                      handleLocationError(false, infoWindow, $scope.map.getCenter());
                    }
                    $scope.markers = [];
                    
                    var createMarker = function (info){
                        
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: new google.maps.LatLng(info.lat, info.long),
                            title: info.country+' '+info.city
                        });
                        marker.content = '<div class="infoWindowContent">' + info.address + info.postalCode +'</div>';
                        
                        google.maps.event.addListener(marker, 'click', function(){
                            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                            infoWindow.open($scope.map, marker);
                        });
                        
                        $scope.markers.push(marker);
                        
                    }  
                    
                    for (i = 0; i < cities.length; i++){
                        createMarker(cities[i]);
                    }

                    $scope.openInfoWindow = function(e, selectedMarker){
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    }
                });
              

          });