$(document).ready(function ($) {
    
/*
    $('#getBtn').click(function () {
        
        var my_address = $('#address').val();
        console.log(address);
        var geocoder = new google.maps.Geocoder();
        
        var geoCodeRequest = {
            address: my_address
        };
        geocoder.geocode(geoCodeRequest, function (response, status) {
            
            if(status === google.maps.GeocoderStatus.OK) {
                console.log(response);
                var data = response[0];
                var lat = data.geometry.location.lat();
                var lng = data.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat,lng);
                console.log('lat,lng,latlng: ' + lat+ ', ' + lng +', ' + latlng )
                
                var mapProp = {
                    center: latlng,
                    zoom:15,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                }
                
                 var map = new google.maps.Map(document.getElementById("my_map"),mapProp);
                
            } else {
                alert(status);
            };
        });
    });
    

	console.log('This is ready');
    
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapProp = {
        center: latlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("my_map"),mapProp);

        var marker = new google.maps.Marker({
          position: latlng,
          map: map, 
          title: "You are here! (at least within a "+position.coords.accuracy+" meter radius)"
        });
		
    };
	
	function error(){
		
		console.log("Geolocation not supported by browser");
	};
});
*/
    
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        var lat_default = 65.0126232;
        var lng_default = 25.4626979;
        var latlng = new google.maps.LatLng(lat_default, lng_default);
        var mapProp = {
        center: latlng,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("my_map"),mapProp);

        /*var marker = new google.maps.Marker({
          position: latlng,
          map: map, 
          title: "Are you here? (at least within a "+position.coords.accuracy+" meter radius)"
        });*/
		
    };
    
    function error(){
		
		console.log("Geolocation not supported by browser");
	};
    
    $('#getBtn').click(function () {
        
        var my_address = $('#address').val();
        console.log(address);
        var geocoder = new google.maps.Geocoder();
        
        var geoCodeRequest = {
            address: my_address
        };
        
        geocoder.geocode(geoCodeRequest, function (response, status) {
            
            if(status === google.maps.GeocoderStatus.OK) {
                console.log(response);
                var data = response[0];
                var lat = data.geometry.location.lat();
                var lng = data.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat,lng);
                console.log('lat,lng,latlng: ' + lat+ ', ' + lng +', ' + latlng );
                var temp_url;
                temp_url = "https://api.wunderground.com/api/9f4c9f5718842fd6/geolookup/conditions/q/" + lat +',' + lng + ".json"
                //url : "http://api.wunderground.com/api/9f4c9f5718842fd6/geolookup/conditions/q/" + address + ".json"
                console.log(temp_url);
        
                jQuery(document).ready(function($) {
                    console.log('address: ' + address );
                      $.ajax({
                      url : temp_url,
                      dataType : "jsonp",
                      success : function(parsed_json) {
                          var location = parsed_json['location']['city'];
                          var observation_location = parsed_json['current_observation']['observation_location']['city'];
                          console.log('observation_location: ' + observation_location )
                          var lat_parsed = parsed_json['current_observation']['observation_location']['latitude'];
                          var lng_parsed = parsed_json['current_observation']['observation_location']['longitude'];
                          var temp_c = parsed_json['current_observation']['temp_c'];
                          //$scope.city = location;
                          //$scope.$apply();      
                          console.log('lat,lng,temp: ' + lat_parsed+ ', ' + lng_parsed +', ' + temp_c );
                              //alert("Current temperature in " + location + " is: " + temp_c);
                          temperature(observation_location,lat_parsed,lng_parsed,temp_c);
                      }
                      });
                    });
    
                    function temperature(location,lat_parsed,lng_parsed,temp_c){

                        console.log('lat,lng,temp: ' + lat_parsed + ', ' + lng_parsed +', ' + temp_c )
                        var latlng = new google.maps.LatLng(lat_parsed, lng_parsed);
                            var mapProp = {
                            center:latlng,
                            zoom:10,
                            mapTypeId:google.maps.MapTypeId.ROADMAP
                          };
                            var map=new google.maps.Map(document.getElementById("my_map"),mapProp);

                        var marker = new google.maps.Marker({
                              position: latlng, 
                              map: map, 
                              title: location + ": "+ temp_c +" C"
                    });
                };
            };
        });
    });
});    
    
/* function gettemp(address){
            jQuery(document).ready(function($) {
            console.log('address: ' + address );
              $.ajax({
              url : "http://api.wunderground.com/api/9f4c9f5718842fd6/geolookup/conditions/q/FI/" + address + ".json",
//              url : "http://api.wunderground.com/api/9f4c9f5718842fd6/geolookup/conditions/q/FI/kempele.json",
              dataType : "jsonp",
              success : function(parsed_json) {
                  var location = parsed_json['location']['city'];
                  console.log('location: ' + location )
                  var lat = parsed_json['current_observation']['observation_location']['latitude'];
                  var lng = parsed_json['current_observation']['observation_location']['longitude'];
                  var temp_c = parsed_json['current_observation']['temp_c'];
                  //$scope.city = location;
                  //$scope.$apply();      
                  console.log('lat,lng,temp: ' + lat+ ', ' + lng +', ' + temp_c );
                      //alert("Current temperature in " + location + " is: " + temp_c);
                  temperature(location,lat,lng,temp_c);
              }
              });
            });
    
            function temperature(location,lat,lng,temp_c){
                
                console.log('lat,lng,temp: ' + lat+ ', ' + lng +', ' + temp_c )
                var latlng = new google.maps.LatLng(lat, lng);
                    var mapProp = {
                    center:latlng,
                    zoom:10,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                  };
                    var map=new google.maps.Map(document.getElementById("my_map"),mapProp);

                var marker = new google.maps.Marker({
                      position: latlng, 
                      map: map, 
                      title: location + ": "+ temp_c +" C"
              });
            };
 }*/
	


