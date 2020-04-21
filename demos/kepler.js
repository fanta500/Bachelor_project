import pv from '..';
import Kepler from './data-kepler';

export default function() {
  // Get the current page scroll position 
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; 
  function disableScroll() { 
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
} 
  
function enableScroll() { 
    window.onscroll = function() {}; 
} 

  document.addEventListener("keydown", event => {
    if (event.keyCode === 16) {
      //keyCode 16 = shift
      disableScroll();
    }
  });
  document.addEventListener("keyup", event => {
    if (event.keyCode === 16) {
      //keyCode 16 = shift
      enableScroll();
    }
  });

  let config = {
    container: "pv-vis",
    viewport: [2000, 4000],
    profiling: true
  }
  
  let views = [
    {
      id: 'map_tight', offset: [50,0],
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      width: 800, height: 600,
    },
  ]

  let app = pv(config).view(views)

  let run = (evt) => {
    app.input({
      source: evt.target.files[0],
      batchSize: 5000000,
      schema: {
        target_name: 'string',
        s_ra: 'float',
        s_dec: 'float',
        t_min: 'float',
        t_max: 'float',
        t_exptime: 'int'
      }
    }).batch([
      {
        match: {
          s_ra: [279.62749, 301.82369],
          s_dec: [36.55995, 52.47462]
        },
        aggregate: {
          $bin: [{s_ra: 3200}, {s_dec: 1800}],
          $collect: {
            values: {$count: '*'}
          },
        },
        out: 'map_tight'
      },  
    ]).progress([
      {
        visualize: {
          id: 'map_tight',
          in: 'map_tight',
          mark: 'circle',
          color: {
            field: 'values',
            exponent: '0.001'
          },
          x: 's_ra', 
          y: 's_dec',
        }
      },
    ])
    .interact([
      {
        event: ['pan','zoom'], 
        from: 'map_tight', 
        response: {
          map_aggr: {
            selected: {color: 'white'}
          }
        }
      },
    ])
  }
  
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
  document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" />`

  document.getElementById('input-file').onchange = run

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
}


    

