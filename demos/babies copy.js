import pv from '..';
import {dsvFormat} from 'd3-dsv';

export default function() {
  let config = {
    container: "pv-vis",
    viewport: [800, 600]
  }

  let views = [{
    id: 'v1', width: 800, height: 600,
        padding: {left: 100, right: 10, top: 20, bottom: 50},
        offset: [0, 0],
        gridlines: {y: true},
        legend: false
  }]
  
  let app = pv(config).view(views);
  // fetch("http://localhost:5500/demos/flights.csv").then(response => response.text())
  // .then(text => dsvFormat(',').parse(text))
  // .then(d => {
  //   console.log(d);
  //   run(d)
  // });
  
  // {
  //   method: 'http',
  //   source: 'http://localhost:5500/demos/flights.csv',
  //   batchSize: 5000,
  //   schema: {
  //     from_airport: "string",
  //     from_city: "string",
  //     from_country: "string",
  //     from_long: "float",
  //     from_lat: "float",
  //     to_airport: "string",
  //     to_city: "string",
  //     to_country: "string",
  //     to_long: "float",
  //     to_lat: "float",
  //     airline: "string",
  //     airline_country: "string",
  //     distance: "int"
  //   }

  app.input({
    method: 'http',
    source: 'http://localhost:8080/demos/flightsJSON.json',
    batchSize: 5000,
    schema: {
      from_airport: "string",
      from_city: "string",
      from_country: "string",
      from_long: "float",
      from_lat: "float",
      to_airport: "string",
      to_city: "string",
      to_country: "string",
      to_long: "float",
      to_lat: "float",
      airline: "string",
      airline_country: "string",
      distance: "int"
    }
  }).batch([
    {
      match: {
        distance: [0, 15000],
        airline: {$in: ['Aerocondor', 'Air Burkina', 'Yuzhmashavia']}
      },
      aggregate: {
        $group: ['distance', 'airline'],
        $collect: {
          flights: {$count: '*'}
        }
      }
    }
  ]).progress([
    {
      visualize: {
        id: 'v1',
        mark: 'rect',
        x: 'airline',
        y: 'distance',
        color: 'teal'
      }
    }
  ])

  document.getElementById('next-button').onclick = () => {
    try {
      app.next();
    }
    catch(e) {
      console.log(e);
    }
  }
  document.getElementById('start-button').onclick = () => {
    try {
      app.start();
    }
    catch(e) {
      console.log(e);
    }
  }
}


document.getElementById('pv-demo-description').innerHTML = `
<h3>PV Demo </h3>
<p>
  This demo uses sythnetic data to show how PV can be used to create a progressive visualization application with mulitple linked views and interactions.
</p>
<p>
  Press "progress" butoon to incrementally process and visualize data. "Brush-and-link" interaction can be used on the area chart at the bottom to highlight data at the two bar charts above.
  The incremental data processing, visualizations, and interactions are accelerated using the GPU.
</p>
`;
    

