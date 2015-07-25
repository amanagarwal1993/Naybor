(function(){
    var app = angular.module('searchHotels', []);
    
    var shops = [];
    
    var query = "http://overpass-api.de/api/interpreter?data=[out:json];";
            
    
    app.controller("PlaceController", ['$scope', '$http', function($scope, $http){
        
        $scope.places = shops;
       // $scope.hotels = this;                                 NO NEED FOR HOTELS VARIABLE
        $scope.objects = [];
        $scope.spots = new Array;
        $scope.locations = new Array;
        $scope.message = "";
        
        $scope.newPlace = {};
        
        $scope.city = new String();
        
        $scope.addPlace = function() {
            $scope.places.push($scope.newPlace);
            $scope.newPlace = {};
            
            $scope.addCity = "area['name'='" + $scope.city + "'];";
            $scope.amenity = "node(area)" + "[shop=" + $scope.places[0].name.toLowerCase() + "];node(around:" + $scope.places[0].distance + ")[tourism=hotel];out body;";
            
            var request = query.concat($scope.addCity, $scope.amenity);
        
            $http.get(request).success(function(data) {
                $scope.objects = data;
                //console.log($scope.objects.elements);         NO NEED ANYMORE
                
                angular.forEach($scope.objects.elements, function(value, key) {
                    $scope.spots.push(value.tags.name);
                    $scope.locations.push([value.lat, value.lon]);
                });
                //console.log($scope.spots);                    NO NEED ANYMORE
                if ($scope.locations.length >0) {
                    console.log($scope.locations);
                    initialize();
                } else {
                    //console.log("Gotcha");
                    $scope.message = "Sorry, no hotels found. Don't worry, send me an email!";
                    
                };
                
                
            });
            
     /*       for(var i=0; i< $scope.locations.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.locations[i][0], $scope.locations[i][1]),
                    map: map,
                    title: $scope.spots.name
                });
                marker.setMap(map);
            };
*/       };
        
        function initialize() {
        var mapCanvas = document.getElementById("map-canvas");
        var mapOptions = {
            center: new google.maps.LatLng($scope.locations[0][0], $scope.locations[0][1]),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        setMarkers(map, $scope.locations, $scope.spots);
        
    };
        function setMarkers(map, locations, spots) {
            for (var i=0; i<locations.length; i++) {
                var myLatLng = new google.maps.LatLng(locations[i][0], locations[i][1]);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: spots[i]
                });
            };
        };
        
        //google.maps.event.addDomListener(window, 'load', initialize);
    
        
        
    }] );
    
    
})();   