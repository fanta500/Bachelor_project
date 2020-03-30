import pv from '..';

export default function() {
  let config = {
    container: "pv-example",
    viewport: [800, 600]
  }
  
  let view = [{
    id: 'v1', width: 800, height: 600,
        padding: {left: 100, right: 10, top: 20, bottom: 50},
        offset: [0, 0],
        gridlines: {y: true},
        legend: false
  }]
  
  let app = pv(config).view(view);
  
  p.input({
    source: 'flights.csv',
    method: 'file',
    batchSize: 500000,
    type: 'text/csv',
    delimiter: ','
  });
  
  p.batch([
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
  
  p.progress([
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
  
  p.execute({mode: 'automatic'})
}
