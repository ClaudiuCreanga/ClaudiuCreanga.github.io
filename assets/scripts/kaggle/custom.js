
var series = [{"country":"United States","iso_3":"USA","Total":852,"per_capita":30.61},{"country":"Russian Federation","iso_3":"RUS","Total":223,"per_capita":15.18},{"country":"China","iso_3":"CHN","Total":149,"per_capita":1.17},{"country":"India","iso_3":"IOT","Total":145,"per_capita":1.43},{"country":"France","iso_3":"FRA","Total":125,"per_capita":21.11},{"country":"United Kingdom","iso_3":"GBR","Total":117,"per_capita":19.62},{"country":"Germany","iso_3":"DEU","Total":106,"per_capita":12.9},{"country":"Canada","iso_3":"CAN","Total":78,"per_capita":25.04},{"country":"Australia","iso_3":"AUS","Total":76,"per_capita":31.88},{"country":"Japan","iso_3":"JPN","Total":74,"per_capita":5.84},{"country":"Netherlands","iso_3":"NLD","Total":59,"per_capita":37.19},{"country":"Singapore","iso_3":"SGP","Total":55,"per_capita":154.19},{"country":"Spain","iso_3":"ESP","Total":52,"per_capita":13.18},{"country":"Poland","iso_3":"POL","Total":51,"per_capita":13.19},{"country":"Ukraine","iso_3":"UKR","Total":40,"per_capita":7.93},{"country":"Brazil","iso_3":"BRA","Total":34,"per_capita":2.0},{"country":"Italy","iso_3":"ITA","Total":31,"per_capita":5.37},{"country":"Israel","iso_3":"ISR","Total":28,"per_capita":45.04},{"country":"Belgium","iso_3":"BEL","Total":27,"per_capita":26.37},{"country":"Taiwan","iso_3":"TWN","Total":27,"per_capita":12.13},{"country":"Switzerland","iso_3":"CHE","Total":24,"per_capita":33.52},{"country":"Sweden","iso_3":"SWE","Total":20,"per_capita":22.57},{"country":"Finland","iso_3":"FIN","Total":18,"per_capita":34.81},{"country":"Greece","iso_3":"GRC","Total":18,"per_capita":17.07},{"country":"Portugal","iso_3":"PRT","Total":15,"per_capita":15.0},{"country":"Czech Republic","iso_3":"CZE","Total":14,"per_capita":13.62},{"country":"Hungary","iso_3":"HUN","Total":13,"per_capita":12.94},{"country":"South Africa","iso_3":"ZAF","Total":13,"per_capita":3.22},{"country":"Belarus","iso_3":"BLR","Total":12,"per_capita":11.72},{"country":"South Korea","iso_3":"KOR","Total":11,"per_capita":2.35},{"country":"Ireland","iso_3":"IRL","Total":10,"per_capita":26.49},{"country":"Turkey","iso_3":"TUR","Total":10,"per_capita":1.5},{"country":"New Zealand","iso_3":"NZL","Total":10,"per_capita":25.89},{"country":"Austria","iso_3":"AUT","Total":9,"per_capita":11.12},{"country":"Slovakia","iso_3":"SVK","Total":8,"per_capita":14.82},{"country":"Romania","iso_3":"ROU","Total":8,"per_capita":3.56},{"country":"Estonia","iso_3":"EST","Total":7,"per_capita":48.64},{"country":"Lithuania","iso_3":"LTU","Total":7,"per_capita":18.93},{"country":"Iran","iso_3":"IRN","Total":6,"per_capita":0.89},{"country":"Philippines","iso_3":"PHL","Total":6,"per_capita":0.79},{"country":"Slovenia","iso_3":"SVN","Total":6,"per_capita":30.18},{"country":"Norway","iso_3":"NOR","Total":6,"per_capita":13.4},{"country":"Denmark","iso_3":"DNK","Total":6,"per_capita":11.26},{"country":"Argentina","iso_3":"ARG","Total":6,"per_capita":1.62},{"country":"Vietnam","iso_3":"VNM","Total":5,"per_capita":0.63},{"country":"Armenia","iso_3":"ARM","Total":5,"per_capita":14.2},{"country":"Sri Lanka","iso_3":"LKA","Total":5,"per_capita":2.66},{"country":"Malaysia","iso_3":"MYS","Total":4,"per_capita":1.8},{"country":"Egypt","iso_3":"EGY","Total":4,"per_capita":0.58},{"country":"Colombia","iso_3":"COL","Total":4,"per_capita":0.95},{"country":"Croatia","iso_3":"HRV","Total":4,"per_capita":8.94},{"country":"Indonesia","iso_3":"IDN","Total":4,"per_capita":0.17},{"country":"Chile","iso_3":"CHL","Total":3,"per_capita":1.97},{"country":"Serbia","iso_3":"SRB","Total":3,"per_capita":4.25},{"country":"Mexico","iso_3":"MEX","Total":3,"per_capita":0.3},{"country":"Thailand","iso_3":"THA","Total":2,"per_capita":0.33},{"country":"Latvia","iso_3":"LVA","Total":2,"per_capita":8.25},{"country":"Madagascar","iso_3":"MDG","Total":2,"per_capita":1.25},{"country":"Morocco","iso_3":"MAR","Total":2,"per_capita":0.71},{"country":"Bulgaria","iso_3":"BGR","Total":2,"per_capita":2.44},{"country":"Venezuela","iso_3":"VEN","Total":2,"per_capita":0.83},{"country":"United Arab Emirates","iso_3":"ARE","Total":2,"per_capita":8.19},{"country":"Senegal","iso_3":"SEN","Total":1,"per_capita":1.05},{"country":"Afghanistan","iso_3":"AFG","Total":1,"per_capita":0.44},{"country":"Qatar","iso_3":"QAT","Total":1,"per_capita":16.69},{"country":"Lebanon","iso_3":"LBN","Total":1,"per_capita":3.05},{"country":"Algeria","iso_3":"DZA","Total":1,"per_capita":0.32},{"country":"Bangladesh","iso_3":"BGD","Total":1,"per_capita":0.08},{"country":"Barbados","iso_3":"BRB","Total":1,"per_capita":37.04},{"country":"Costa Rica","iso_3":"CRI","Total":1,"per_capita":2.49},{"country":"Ecuador","iso_3":"ECU","Total":1,"per_capita":0.79},{"country":"El Salvador","iso_3":"SLV","Total":1,"per_capita":1.59},{"country":"Kenya","iso_3":"KEN","Total":1,"per_capita":0.33},{"country":"Kyrgyzstan","iso_3":"KGZ","Total":1,"per_capita":2.13},{"country":"Albania","iso_3":"ALB","Total":1,"per_capita":2.94},{"country":"Panama","iso_3":"PAN","Total":1,"per_capita":3.5},{"country":"Macedonia","iso_3":"MKD","Total":1,"per_capita":4.94},{"country":"Mauritius","iso_3":"MUS","Total":1,"per_capita":8.64},{"country":"Moldova","iso_3":"MDA","Total":1,"per_capita":2.28},{"country":"Mozambique","iso_3":"MOZ","Total":1,"per_capita":0.51},{"country":"Nepal","iso_3":"NPL","Total":1,"per_capita":0.42},{"country":"Nigeria","iso_3":"NGA","Total":1,"per_capita":0.09},{"country":"North Korea","iso_3":"PRK","Total":1,"per_capita":0.42},{"country":"Pakistan","iso_3":"PAK","Total":1,"per_capita":0.06},{"country":"Luxembourg","iso_3":"LUX","Total":1,"per_capita":22.95}]    

// Datamaps expect data in format:
// { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
//   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
var dataset = {};

// We need to colorize every country based on "numberOfWhatever"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
var onlyValues = series.map(function(obj){ return obj["per_capita"]; });
var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

// create color palette function
// color can be whatever you wish
var paletteScale = d3.scale.linear()
        .domain([minValue,maxValue])
        .range(["#EFEFFF","#02386F"]); // blue color

// fill dataset in appropriate format
series.forEach(function(item){ //
    // item example value ["USA", 70]
    var iso = item["iso_3"],
        value = item["per_capita"],
        users = item["Total"];
    dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value), totalCount: users };
});

// render map
new Datamap({
    element: document.getElementById('container'),
    projection: 'mercator', // big world map
    // countries don't listed in dataset will be painted with this color
    fills: { defaultFill: '#F5F5F5' },
    data: dataset,
    geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // don't change color on mouse hover
        highlightFillColor: function(geo) {
            return geo['fillColor'] || '#F5F5F5';
        },
        // only change border
        highlightBorderColor: '#B7B7B7',
        // show desired information in tooltip
        popupTemplate: function(geo, data) {
            // don't show tooltip if country don't present in dataset
            if (!data) { return ; }
            // tooltip content
            return ['<div class="hoverinfo">',
                '<strong>', geo.properties.name, '</strong>',
                '<br>Users per capita/1000000 (in top 3000): <strong>', data.numberOfThings, '</strong>',
                '<br>Total users count (in top 3000): <strong>', data.totalCount, '</strong>',
                '</div>'].join('');
        }
    }
});

