let config = {
  container: "pv-example",
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

app.input({
  source: 'flights.csv',
  method: 'file',
  batchSize: 500000,
  type: 'text/csv',
  delimiter: ','
});

app.batch([
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
]);

app.progress([
  {
    visualize: {
      id: 'v1',
      mark: 'rect',
      x: 'airline',
      y: 'distance',
      color: 'teal'
    }
  }
]);

app.execute({mode: 'automatic'})