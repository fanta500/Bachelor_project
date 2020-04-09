import pv from '..';

export default function() {
  let config = {
    container: "pv-vis",
    viewport: [1000, 1000],
    profiling: true
  }
  
  let views = [
    {
      id: 'chart2', width: 800, height: 300,
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      offset: [50, 0],
      gridlines: {y: true},
      legend: false
    },
    {
      id: 'map_id', offset: [50,350],
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      width: 800, height: 650,
    }
  ]

  let app = pv(config).view(views).input({
    method: 'memory',
    source: function(nrows) {
      let dataset = pv.datasets.Kepler({size: nrows, type: 'array'});
      let data = dataset.data;
      console.log(data)
      console.log(dataset.schema)
      return data;
    },
    batchSize: 10,
    schema: pv.datasets.Kepler.schema
  }).batch([
    {
      aggregate: {
        $group: 'ApparentMagnitude',
        $collect: {count: {$count: '*'}},
      },
      out: 'byMagnitude'
    },
    {
      match: {
        RightAscension: [279.62749, 301.82369],
        Decline: [36.55995, 52.47462]
      },
      aggregate: {
        $bin: [{RightAscension: 10}, {Decline: 10}],
        $collect: {values: {$count: '*'}}
      },
      out: 'map'
    }
  ]).progress([
    {
      visualize: [
        {
          id: 'chart2',
          in: 'byMagnitude',
          mark: 'area',
          x: 'ApparentMagnitude',
          y: 'count',
          zero: true,
          color: 'teal'
        },
        {
          id: 'map_id',
          in: 'map',
          mark: 'rect', color: 'black',
          x: 'RightAscension', y: 'Decline',
        }
      ]
    }
  ])
  // .interact([
  //   {
  //     event: 'brush', 
  //     from: 'map_id', 
  //     response: {
  //       chart2: {
  //         selected: {color: 'orange'}
  //       }
  //     }
  //   }
  // ])
  .onEach(function(stats, profile) {
    document.getElementById('stats').innerHTML = '(completed: ' + stats.completed + ')';
  })

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
<h3>Kepler Demo </h3>
<p>
  This demo uses sythnetic data to show how PV can be used to create a progressive visualization application with mulitple linked views and interactions.
</p>
<p>
  Press "progress" butoon to incrementally process and visualize data. "Brush-and-link" interaction can be used.
  The incremental data processing, visualizations, and interactions are accelerated using the GPU.
</p>
`;
    

