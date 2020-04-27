import pv from '..';
import makeSliders from './double_input_slider'

export default function() {
  //initialize the sliders to control right ascension and decline
  makeSliders()

  //initialize the select file button
  document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" />`

  function disableScroll() { 
    // Get the current page scroll position 
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; 
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
      width: 1600, height: 900,
    },
    {
      id: 'coordinates_chart', offset: [50,950],
      padding: {left: 80, right: 10, top: 20, bottom: 50},
      width: 800, height: 600,
    }
  ]

  function calculateBinRatio() {
    let raMaxRange = $("#ra-slider-range").slider("option", "max") - $("#ra-slider-range").slider("option", "min")
    let raCurrRange = getRightAscension()[1] - getRightAscension()[0]
    let raRatio = raCurrRange / raMaxRange

    let decMaxRange = $("#dec-slider-range").slider("option", "max") - $("#dec-slider-range").slider("option", "min")
    let decCurrRange = getDecline()[1] - getDecline()[0]
    let decRatio = decCurrRange / decMaxRange

    console.log(raRatio, "    ", decRatio)
    return [raRatio, decRatio]
  }

  function getRightAscension() {
    //This method is invoked when the pipeline is started
    let ra = [document.getElementById("ra_min").value, document.getElementById("ra_max").value]
    //console.log(ra)
    return ra
  }

  function getDecline() {
    //This method is invoked when the pipeline is started
    let dec = [document.getElementById("dec_min").value, document.getElementById("dec_max").value]
    //console.log(dec)
    return dec
  }

  let app = pv(config).view(views)

  let confirmData = (evt) => {
    app.input({
      source: evt.target.files[0],
      batchSize: 500000,
      schema: {
        target_name: 'string',
        s_ra: 'float',
        s_dec: 'float',
        t_min: 'float',
        t_max: 'float',
        t_exptime: 'int'
      }
    });
  }

  let analyseVisualise = () => {
    let ra = getRightAscension()
    let dec = getDecline()
    let binSize = calculateBinRatio()

    app.batch([
      {
        match: {
          s_ra: ra,
          s_dec: dec
        },
        aggregate: {
          $bin: [{s_ra: binSize[0]*1600}, {s_dec: binSize[1]*900}],
          $collect: {
            map_values: {$count: '*'}
          },
        },
        out: 'map_tight'
      },  
      {
        match: {
          s_ra: [279, 302]
        },
        aggregate: {
          $bin: {s_ra: 6},
          $collect: {
            chart_values: {$count: '*'},
            chart_min: {$min: '*'}
          },
        },
        out: 'chart1'
      }
    ]).progress([
      {
        visualize: {
          id: 'map_tight',
          in: 'map_tight',
          mark: 'rectangle',
          color: {
            field: 'map_values',
            exponent: '0.25'
          },
          x: 's_ra', 
          y: 's_dec',
        }
      },
      {
        visualize: {
          id: 'coordinates_chart',
          in: "chart1",
          mark: 'bar',
          color: 'steelblue',
          x: 's_ra', 
          y: 'chart_values'
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
    ]);
    
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

  document.getElementById('input-file').onchange = confirmData
  document.getElementById('confirm-data').onclick = analyseVisualise
}


    

