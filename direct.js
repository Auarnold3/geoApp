<!--
 geoApp
 Geolocation map of Sewanee -->
<html>
  <head>
    <title> Sewanee map </title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=yes">
    <meta charset="utf-8">
    <style>
      html, body {
        height: 100%;
        margin: 0px;
      }
      #map-canvas {
        top: 10px;
        height: 85%;
        margin: 0px;
        padding: 0px;
        margin: 50px 5px 20px 260px;
        border-style: solid;
        border-width: 2px
        }
      #panel {
        position: absolute;
        top: 70px;
        margin-left: 850px;
        z-index: 100;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        }
      #panel2 {
        position: absolute;
        top: 70px;
        margin-left: 300px;
        z-index: 100;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
      }
      #sewaneeBox {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 50px;
      width: 100%;
      background-color: #8A2BE2;
      padding: 5px;
      }
      #checkBox {
      position: absolute;
      top: 70px;
      left: 5px;
      height: 70%;
      width: 240px;
      background-color: #E0E0E0;
      -webkit-border-radius: 40px;
      border-radius:         40px;
      border: 1px solid #999;
      padding: 10px;
      }
     
    </style>
</script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
    <script src="buildings.js"> </script>
    <script src="coords.js"> </script>
    <script src="direct.js"> </script>
    <script type="text/javascript">

var map;
var infowindow;
var marker, marker1, posMarker, dMarker;
var coords = new google.maps.LatLng(35.20438,-85.92016);
var markersArray = [];
var positionTimer;
var locationArray = [fulford,walsh,mcclurg,allsaints,bookstore,woods,stirlings,sut,gamma];
var locationNameArray = ['Fulford','Walsh-Ellett','McClurg','All Saints Chapel',
'Barnes&Noble','Woods','Stirlings','Thompson Union','Gamma'];
var dormMarkerBox = [];


function initialize() {

    var mapOptions = {
        center: coords,
        zoom: 17
};

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
    var infowindow1 = new google.maps.InfoWindow({
          content: ""
}
  );
 
    if  (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setMarker);
          } else {
            alert("Your browser does not support the Geolocation API");
}
function setMarker(pos) {
        var lat = pos.coords.latitude,
        lng = pos.coords.longitude;
        coords = new google.maps.LatLng(lat, lng);
        posMarker = new google.maps.Marker({
        map: map,
        icon: 'blue-dot.png',
        position: coords,
        title: "Current Position"
}
  );
        map.panTo(coords);
            directionsDisplay = new google.maps.DirectionsRenderer();

          positionTimer = navigator.geolocation.watchPosition(function (pos) {
            var lat = pos.coords.latitude,
             lng = pos.coords.longitude;
           coords = new google.maps.LatLng(lat, lng);
            posMarker.setPosition(coords);
           // map.panTo(coords);
}
      
  );
        directionsDisplay.setMap(map)
     }

      var addListenersOnPolygon = function(polygon) {
      google.maps.event.addListener(polygon, 'click', function (event) {
      alert(polygon.indexID);
}
  ); 
     }

     for (var i = 0; i < dormsArray.length; i++) {
   
        var p = new google.maps.Polygon({
        paths: dormsArray[i],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        indexID: i
}
  );
        p.setMap(map);
        addListenersOnPolygon(p);
}

     for (var j = 0; j < fratArray.length; j++) {
   
        var q = new google.maps.Polygon({
         paths: fratArray[j],
        strokeColor: '#CCFFEE',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#CCFF10',
        fillOpacity: 0.35,
        indexID: j
}
  );
        q.setMap(map);
        addListenersOnPolygon(q);
}
        
 
        infowindow = new google.maps.InfoWindow({
        content: ""
}
  );
  
        var request = {
        location: coords,
        radius: 500,
};

      var service = new google.maps.places.PlacesService(map);
         service.nearbySearch(request, callback);


            } //end of Initialize function


      //Construct markers
      var infoArray =  [fulfordStr,walshStr,mcclurgStr,allsaintsStr,bookStr,woodsStr,stirlingsStr,sutStr,gammaStr];
      for (var i=0; i<= locationArray.length; i++) {
      var storeV=infoArray[i];
      marker1 = new google.maps.Marker({
      position: locationArray[i],
      map: map,
      title: locationNameArray[i]

}
  );
       markersArray.push(marker1);
       linkInfoWindow(marker1, map, infowindow, storeV);

     }
     
       function linkInfoWindow(marker1, map, infowindow, description) {
       google.maps.event.addListener(marker1, 'click', function() {
       infowindow.setContent(description);
       infowindow.open(map, marker1);
}
    );
        }

     for (var o=0; o<dormMarkerarray.length; o++){
     dMarker = new google.maps.Marker({
     position: dormMarkerarray[o],
     map: map
}
   );      dormMarkerBox.push(dMarker);
       }
     
     function residenceBox() {
     if(box1.checked){
     for( var m=0; m < dormMarkerBox.length; m++){
     dormMarkerBox[m].setMap(map);
}
    }
     if(!box1.checked){
     for(var l=0; l < dormMarkerBox.length; l++){
     dormMarkerBox[l].setMap(null);
}
    }
    }
     function academicBox() {
     if(box2.checked){
     for(m=0; m < markersArray.length; m++){
     markersArray[m].setMap(map);
}
    }
     if(!box2.checked){
     for(l=0; l < markersArray.length; l++){
     markersArray[l].setMap(null);
}
    }
    }
     function routeCalc(){
     if(document.getElementById('start').value < 28){
     calcRoute();
     }
     else{calcRoute2();}
     }

function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        //createMarker(results[i]);
}
  }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  </script>
  </head>
  <body>
<div id="sewaneeBox">
<h1>Sewanee:The University of the South</h1>
</div>
<div id="checkBox">
<br>
CheckBoxes Will Be With Us SOON!!<hr><br>
<input type="checkbox" id="box1" onchange="residenceBox()"/>Residence Halls<br>
<input type="checkbox" id="box2" onchange="academicBox()"/>Academic Buildings<br>
</div>
<div id="panel">
    <b>Directions to</b>
    <select id="end" onchange="calcRoute();">
      <option value="27 Canterbury Way, Sewanee, TN, 37375">     27 Canterbury</option>
      <option value="4">                                          Gailor Hall</option>
      <option value="3">                                         Hospital</option>
      <option value="0">                                         Walsh-Ellett Hall</option>
      <option value="1">                                         Book Store</option>
      <option value="2">                                         Woods/Spencer Hall</option>
      <option value="5">                                         McClurg Dining Hall</option>
      <option value="6">                                         Fowler Center</option>
      <option value="7">                                         Carnegie Hall</option>
      <option value="8">                                         DuPoint Library</option>
      <option value="9">                                         Bishops Commons</option>
      <option value="10">                                        Fulford Hall</option>
      <option value="11">                                        All Saints</option>
      <option value="12">                                        Thompson Union</option>
      <option value="13">                                        St. Lukes Hall</option>
      <option value="14">                                        McCrady Hall</option>
      <option value="15">                                        Van Ness Hall</option>
      <option value="16">                                        Snowden Hall</option>
      <option value="17">                                        Archives</option>
      <option value="18">                                        Police/Fire Service</option>
      <option value="19">                                        Stirlings</option>
      <option value="20">                                        McGriff Alumni House</option>
      <option value="21">                                        Hoffman Hall</option>
      <option value="22">                                        Career Leadership and Development Office</option>
      <option value="23">                                        Barnwick Womens Center</option>
      <option value="24">                                        EQB</option>
      <option value="25">                                        Chen Hall</option>
      <option value="26">                                        Convocation Hall</option>
      <option value="27">                                        Guerry Hall and Art Gallery</option>
    </select>
    </div>
  <div id="panel2">
    <b>Directions From</b>
    <select id="start" onchange="routeCalc();">
      <option value="28">                                        Current Location</option>
      <option value="4">                                          Gailor Hall</option>
      <option value="3">                                         Hospital</option>
      <option value="0">                                         Walsh-Ellett Hall</option>
      <option value="1">                                         Book Store</option>
      <option value="2">                                         Woods/Spencer Hall</option>
      <option value="5">                                         McClurg Dining Hall</option>
      <option value="6">                                         Fowler Center</option>
      <option value="7">                                         Carnegie Hall</option>
      <option value="8">                                         DuPoint Library</option>
      <option value="9">                                         Bishops Commons</option>
      <option value="10">                                        Fulford Hall</option>
      <option value="11">                                        All Saints</option>
      <option value="12">                                        Thompson Union</option>
      <option value="13">                                        St. Lukes Hall</option>
      <option value="14">                                        McCrady Hall</option>
      <option value="15">                                        Van Ness Hall</option>
      <option value="16">                                        Snowden Hall</option>
      <option value="17">                                        Archives</option>
      <option value="18">                                        Police/Fire Service</option>
      <option value="19">                                        Stirlings</option>
      <option value="20">                                        McGriff Alumni House</option>
      <option value="21">                                        Hoffman Hall</option>
      <option value="22">                                        Career Leadership and Development Office</option>
      <option value="23">                                        Barnwick Womens Center</option>
      <option value="24">                                        EQB</option>
      <option value="25">                                        Chen Hall</option>
      <option value="26">                                        Convocation Hall</option>
      <option value="coords">                                        Guerry Hall and Art Gallery</option>
    </select>
    </div>
  <div id="out"></div>
  <div id="map-canvas"></div>
  </body>
  </html>
