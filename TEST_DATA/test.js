var table;
var minDistanceSlider;
var maxDistanceSlider;
var maxFlightDistance = 0;
var drawFlightsCheckbox;

function preload() {
    table = loadTable("flights.csv","csv","header")
}

function setup() {
    createCanvas(900,450)
    noStroke()
    noLoop()
    setupParameters()
    setupInteractiveElements()
}

function setupParameters() {
    let flightDistances = table.getColumn("distance").map(Number)
    maxFlightDistance = max(flightDistances)
}

function setupInteractiveElements() {
    //creating of sliders for selecting min and max flight distance flights to render
    minDistanceSlider = createSlider(1, maxFlightDistance, 0, maxFlightDistance/100)
    minDistanceSlider.position(0, height)
    minDistanceSlider.style("width", "150px")
    // fill(51)
    // textSize(32)
    // text("Min. flight distance", 155, height)
    maxDistanceSlider = createSlider(1, maxFlightDistance, maxFlightDistance, maxFlightDistance/100)
    maxDistanceSlider.position(0, height+25)
    maxDistanceSlider.style("width", "150px")
    // text("Max. flight distance", 155, height+25)

    // //make checkbox for drawing of lines between from and to of a flight
    // drawFlightsCheckbox = createCheckbox("Draw lines between airports?", false)
    // drawFlightsCheckbox.position(0, height+50)
}

function draw() {
    background(255,255,255)
    var rows = table.getRows()
    for (var r = 0; r < rows.length; r++) {
        var distance = rows[r].getNum("distance")
        var minDistance = minDistanceSlider.value()
        var maxDistance = maxDistanceSlider.value()
    
        if ( minDistance < distance && distance < maxDistance ) {
            var from_long = rows[r].getNum("from_long")
            var from_lat = rows[r].getNum("from_lat")
            var from_country = rows[r].getString("from_country")
            var to_country = rows[r].getString("to_country")
            var distance = rows[r].getNum("distance")
    
            var x_from = map(from_long,-180,180,0,width)
            var y_from = map(from_lat,-90,90,height,0)
            if ( from_country == to_country ) {
            fill(255,0,0,10)
            } else {
            fill(0,0,255,10)
            }
            var radius = map(distance, 0, maxFlightDistance, 3, 12)
            ellipse(x_from,y_from,radius,radius)
            // if (drawFlightsCheckbox.checked()) {
            //     var to_long = rows[r].getNum("to_long")
            //     var to_lat = rows[r].getNum("to_lat")
            //     var x_to = map(to_long,-180,180,0,width)
            //     var y_to = map(to_lat,-180,180,0,width)
            //     fill(50)
            //     line(x_from, y_from, x_to, y_to)
            // }
        }
    }
}

function mouseMoved() {
    redraw()
    return false
}