/*jslint node: true */
'use strict';


// Stamen example

const stamenToner = L.tileLayer(
  'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a hr ef="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="htt ps://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 2,
    maxZoom: 3,
    ext: 'png'
  }
);


// build map with layers
const map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  layers: [stamenToner],
});


// ############################## //
// ######    STYLING     ######## //
// ############################## //

function countryStyle(){
  return{
    weight: 1,
    opacity: 1,
    color: '#666',
    fillColor: '#FF6A2F',
    fillOpacity: 1,
  };
}
function mouseoverStyle(){
  return {
    color : 'red',
    weight : 2,
    fillColor: '#FF4900',
  };
}


// ############################## //
// ####   EMISSIONS DATA   ###### //
// ############################## //


var emissions = {
  brazil : {
    name : "Brazil",
    rank: 12,
    percent: 1.34,
    emit : 462,
    flag : "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
  },
  canada : {
    name: 'Canada',
    rank: 7,
    percent: 1.96,
    emit : 676,
    flag : "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg"
  },
  china : {
    name: 'China',
    rank: 1,
    percent: 30.18,
    emit : "10,432",
    flag : "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
  },
  usa : {
    name: 'United States',
    rank: 2,
    percent: 14.50,
    emit : "5,011",
    flag : "https://upload.wikimedia.org/wikipedia/commons/6/69/John_Trumbull%27s_Depiction_of_the_Flag_of_the_USA.svg"
  },
  eu28 : {
    name: 'The European Union',
    rank: 3,
    percent: 9.93,
    emit : "3,432",
    flag : "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
  },
  india : {
    name: 'India',
    rank: 4,
    percent: 7.33,
    emit : "2,534",
    flag : "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
  },
  russia : {
    name: 'Russia',
    rank: 5,
    percent: 4.81,
    emit : "1,662",
    flag : "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg"
  },
  japan : {
    name: 'Japan',
    rank: 6,
    percent: 3.59,
    emit : "1,240",
    flag : "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg"
  },
  iran : {
    name: 'Iran',
    rank: 8,
    percent: 1.86,
    emit : "643",
    flag : "https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg"
  },
  southkorea : {
    name: 'South Korea',
    rank: 9,
    percent: 1.74,
    emit : "604",
    flag : "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg"
  },
  indonesia : {
    name: 'Indonesia',
    rank: 10,
    percent: 1.53,
    emit : "530",
    flag : "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
  },
  saudiarabia : {
    name: 'Saudi Arabia',
    rank: 11,
    percent: 1.50,
    emit : "517",
    flag : "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
  },
}



// ############################## //
// ###### GEOJSON LAYERS ######## //
// ############################## //


// EU28 ////////////////////////////////////////////////////////
var promise = $.getJSON("geojson/eu28.geojson");
promise.then(function(data) {

  var eu28 = L.geoJson(data, {
    style: countryStyle()
  });
  eu28.addTo(map);
  eu28.on('mouseover', function(e){
    this.setStyle(mouseoverStyle());
  });
  eu28.on('mouseout', function(){
    this.setStyle(countryStyle());
    // document.getElementById("map-legend").innerHTML = null;
  });
  eu28.on('click', function(e){
    map.fitBounds(e.target.getBounds());
    var mapLegend = document.getElementById('map-legend');
    mapLegend.innerHTML = `<h1>${emissions.eu28.name}</h1></br><h1> Emissions</h1>`;
    var flag = document.getElementById('flag');
    flag.innerHTML = `<img src="${emissions.eu28.flag}">`;
    var datacontent = document.getElementById('data-content');
    datacontent.innerHTML =  `
                        <p>Ranked #${emissions.eu28.rank} Highest Emitter on Planet</p></br>
                        <p>Emitted ${emissions.eu28.percent}% of Global Emissions</p></br>
                        <p>Emitted ${emissions.eu28.emit} Megatons of CO2</p></br>
                      `;
  });
});

// USA  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/usa.geojson");
promise.then(function(data) {
      var usa = L.geoJson(data, {
        style: countryStyle()
      });
      usa.addTo(map);
      usa.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());

      });
      usa.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      usa.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.usa.name}</h1></br><h1> Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.usa.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.usa.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.usa.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.usa.emit} Megatons of CO2</p></br>
                          `;
      });

});

// China  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/china.geojson");
promise.then(function(data) {
      var china = L.geoJson(data, {
        style: countryStyle()
      });
      china.addTo(map);
      china.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());

      });
      china.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      china.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.china.name} Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.china.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.china.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.china.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.china.emit} Megatons of CO2</p></br>
                          `;
      });
});

// India  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/india.geojson");
promise.then(function(data) {
  var india = L.geoJson(data, {
    style: countryStyle()
  });
  india.addTo(map);
  india.on('mouseover', function(e){
    this.setStyle(mouseoverStyle());

  });
  india.on('mouseout', function(){
    this.setStyle(countryStyle());
    // document.getElementById("map-legend").innerHTML = null;
  });
  india.on('click', function(e){
    map.fitBounds(e.target.getBounds());
    var mapLegend = document.getElementById('map-legend');
    mapLegend.innerHTML = `<h1>${emissions.india.name} Emissions</h1>`;
    var flag = document.getElementById('flag');
    flag.innerHTML = `<img src="${emissions.india.flag}">`;
    var datacontent = document.getElementById('data-content');
    datacontent.innerHTML =  `
                        <p>Ranked #${emissions.india.rank} Highest Emitter on Planet</p></br>
                        <p>Emitted ${emissions.india.percent}% of Global Emissions</p></br>
                        <p>Emitted ${emissions.india.emit} Megatons of CO2</p></br>
                      `;
  });
});

// Russia  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/russia.geojson");
promise.then(function(data) {
  var russia = L.geoJson(data, {
    style: countryStyle()
  });
  russia.addTo(map);
  russia.on('mouseover', function(e){
    this.setStyle(mouseoverStyle());

  });
  russia.on('mouseout', function(){
    this.setStyle(countryStyle());
    // document.getElementById("map-legend").innerHTML = null;
  });
  russia.on('click', function(e){
    map.fitBounds(e.target.getBounds());
    var mapLegend = document.getElementById('map-legend');
    mapLegend.innerHTML = `<h1>${emissions.russia.name} Emissions</h1>`;
    var flag = document.getElementById('flag');
    flag.innerHTML = `<img src="${emissions.russia.flag}">`;
    var datacontent = document.getElementById('data-content');
    datacontent.innerHTML =  `
                        <p>Ranked #${emissions.russia.rank} Highest Emitter on Planet</p></br>
                        <p>Emitted ${emissions.russia.percent}% of Global Emissions</p></br>
                        <p>Emitted ${emissions.russia.emit} Megatons of CO2</p></br>
                      `;
  });
});

// Canada  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/canada.geojson");
promise.then(function(data) {
      var canada = L.geoJson(data, {
        style: countryStyle()
      });
      canada.addTo(map);
      canada.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());
      });
      canada.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      canada.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.canada.name} Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.canada.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.canada.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.canada.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.canada.emit} Megatons of CO2</p></br>
                          `;
      });
});

// Japan  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/japan.geojson");
promise.then(function(data) {
    var japan = L.geoJson(data, {
      style: countryStyle()
    });
    japan.addTo(map);
    japan.on('mouseover', function(e){
      this.setStyle(mouseoverStyle());
    });
    japan.on('mouseout', function(){
      this.setStyle(countryStyle());
      // document.getElementById("map-legend").innerHTML = null;
    });
    japan.on('click', function(e){
      map.fitBounds(e.target.getBounds());
      var mapLegend = document.getElementById('map-legend');
      mapLegend.innerHTML = `<h1>${emissions.japan.name} Emissions</h1>`;
      var flag = document.getElementById('flag');
      flag.innerHTML = `<img src="${emissions.japan.flag}">`;
      var datacontent = document.getElementById('data-content');
      datacontent.innerHTML =  `
                          <p>Ranked #${emissions.japan.rank} Highest Emitter on Planet</p></br>
                          <p>Emitted ${emissions.japan.percent}% of Global Emissions</p></br>
                          <p>Emitted ${emissions.japan.emit} Megatons of CO2</p></br>
                        `;
    });
});

// Iran  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/iran.geojson");
promise.then(function(data) {
    var iran = L.geoJson(data, {
      style: countryStyle()
    });
    iran.addTo(map);
    iran.on('mouseover', function(e){
      this.setStyle(mouseoverStyle());
    });
    iran.on('mouseout', function(){
      this.setStyle(countryStyle());
      // document.getElementById("map-legend").innerHTML = null;
    });
    iran.on('click', function(e){
      map.fitBounds(e.target.getBounds());
      var mapLegend = document.getElementById('map-legend');
      mapLegend.innerHTML = `<h1>${emissions.iran.name} Emissions</h1>`;
      var flag = document.getElementById('flag');
      flag.innerHTML = `<img src="${emissions.iran.flag}">`;
      var datacontent = document.getElementById('data-content');
      datacontent.innerHTML =  `
                          <p>Ranked #${emissions.iran.rank} Highest Emitter on Planet</p></br>
                          <p>Emitted ${emissions.iran.percent}% of Global Emissions</p></br>
                          <p>Emitted ${emissions.iran.emit} Megatons of CO2</p></br>
                        `;
    });
});

// South Korea  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/skorea.geojson");
promise.then(function(data) {
    var southkorea = L.geoJson(data, {
      style: countryStyle()
    });
    southkorea.addTo(map);
    southkorea.on('mouseover', function(e){
      this.setStyle(mouseoverStyle());
    });
    southkorea.on('mouseout', function(){
      this.setStyle(countryStyle());
      // document.getElementById("map-legend").innerHTML = null;
    });
    southkorea.on('click', function(e){
      map.fitBounds(e.target.getBounds());
      var mapLegend = document.getElementById('map-legend');
      mapLegend.innerHTML = `<h1>${emissions.southkorea.name} Emissions</h1>`;
      var flag = document.getElementById('flag');
      flag.innerHTML = `<img src="${emissions.southkorea.flag}">`;
      var datacontent = document.getElementById('data-content');
      datacontent.innerHTML =  `
                          <p>Ranked #${emissions.southkorea.rank} Highest Emitter on Planet</p></br>
                          <p>Emitted ${emissions.southkorea.percent}% of Global Emissions</p></br>
                          <p>Emitted ${emissions.southkorea.emit} Megatons of CO2</p></br>
                        `;
    });
});

// Saudi Arabia  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/saudiarabia.geojson");
promise.then(function(data) {
      var saudiarabia = L.geoJson(data, {
        style: countryStyle()
      });
      saudiarabia.addTo(map);
      saudiarabia.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());
      });
      saudiarabia.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      saudiarabia.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.saudiarabia.name} Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.saudiarabia.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.saudiarabia.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.saudiarabia.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.saudiarabia.emit} Megatons of CO2</p></br>
                          `;
      });
});

// Brazil  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/brazil.geojson");
promise.then(function(data) {
      var brazil = L.geoJson(data, {
        style: countryStyle()
      });
      brazil.addTo(map);
      brazil.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());
      });
      brazil.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      brazil.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.brazil.name} Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.brazil.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.brazil.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.brazil.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.brazil.emit} Megatons of CO2</p></br>
                          `;
      });
});

// Indonesia  ////////////////////////////////////////////////////////

var promise = $.getJSON("geojson/indonesia.geojson");
promise.then(function(data) {
      var indonesia = L.geoJson(data, {
        style: countryStyle()
      });
      indonesia.addTo(map);
      indonesia.on('mouseover', function(e){
        this.setStyle(mouseoverStyle());
      });
      indonesia.on('mouseout', function(){
        this.setStyle(countryStyle());
        // document.getElementById("map-legend").innerHTML = null;
      });
      indonesia.on('click', function(e){
        map.fitBounds(e.target.getBounds());
        var mapLegend = document.getElementById('map-legend');
        mapLegend.innerHTML = `<h1>${emissions.indonesia.name} Emissions</h1>`;
        var flag = document.getElementById('flag');
        flag.innerHTML = `<img src="${emissions.indonesia.flag}">`;
        var datacontent = document.getElementById('data-content');
        datacontent.innerHTML =  `
                            <p>Ranked #${emissions.indonesia.rank} Highest Emitter on Planet</p></br>
                            <p>Emitted ${emissions.indonesia.percent}% of Global Emissions</p></br>
                            <p>Emitted ${emissions.indonesia.emit} Megatons of CO2</p></br>
                          `;
      });
});

// // finally call layer controller
// L.control.layers(baseLayers, overlays).addTo(map);
