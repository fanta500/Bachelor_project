import pv from '..';
import Kepler from './data-kepler';

export default function() {
  let config = {
    container: "pv-vis",
    viewport: [2000, 2000],
    profiling: true
  }
  
  let views = [
    {
      id: 'chart1', width: 800, height: 300,
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      offset: [50, 0],
      gridlines: {y: true},
      legend: false
    },
    {
      id: 'map_tight', offset: [50,350],
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      width: 800, height: 450,
    },
    {
      id: 'map_loose', offset: [50,850],
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      width: 800, height: 450,
    }
  ]

  let app = pv(config).view(views).input({
    method: 'memory',
    source: function(batchSize) {
      let dataset = Kepler({size: batchSize, type: 'array'});
      let data = dataset.data;
      return data;
    },
    batchSize: 5000,
    schema: Kepler.schema
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
        $bin: [{RightAscension: 1600}, {Decline: 900}],
        $collect: {
          values: {$count: '*'}
        },
      },
      out: 'map_tight'
    },  
    {
      match: {
        RightAscension: [279.62749, 301.82369],
        Decline: [36.55995, 52.47462]
      },
      aggregate: {
        $bin: [{RightAscension: 16}, {Decline: 9}],
        $collect: {
          values: {$count: '*'}
        },
      },
      out: 'map_loose'
    }
  ]).progress([
    {
      visualize: {
        id: 'chart1',
        in: 'byMagnitude',
        mark: 'area',
        x: 'ApparentMagnitude',
        y: 'count',
        zero: true,
        color: 'teal'
      }
    },
    {
      visualize: {
        id: 'map_tight',
        in: 'map_tight',
        mark: 'circle',
        color: {
          field: 'values',
          exponent: '0.25'
        },
        x: 'RightAscension', 
        y: 'Decline',
      }
    },
    {
      visualize: {
        id: 'map_loose',
        in: 'map_loose',
        mark: 'circle',
        color: {
          field: 'values',
          exponent: '0.25'
        },
        x: 'RightAscension', 
        y: 'Decline',
      }
    }
  ])
  // .interact([
  //   {
  //     event: 'brush', 
  //     from: 'chart1', 
  //     response: {
  //       map_aggr: {
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
    

