import pv from '..';
import makeSliders from './double_input_slider'

export default function() {
  //initialize the sliders to control various attributes
  makeSliders()

  //initialize the select file button
  document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" />`

  //make the start buttons disabled upon running the program
  document.getElementById("start-button").disabled = true
  document.getElementById("next-button").disabled = true

  //make the confirm parameters button disabled upon running the program
  document.getElementById("confirm-parameters-button").disabled = true;

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

  function calculateBinRatio(raRange, decRange) {
    let raMaxRange = $("#ra-slider-range").slider("option", "max") - $("#ra-slider-range").slider("option", "min")
    let raCurrRange = raRange[1] - raRange[0]
    let raRatio = raCurrRange / raMaxRange

    let decMaxRange = $("#dec-slider-range").slider("option", "max") - $("#dec-slider-range").slider("option", "min")
    let decCurrRange = decRange[1] - decRange[0]
    let decRatio = decCurrRange / decMaxRange

    //console.log(raRatio, "    ", decRatio)
    return [raRatio*1024, decRatio*1024]
  }

  function getRightAscension() {
    //This method is invoked when the pipeline is started
    let ra_range = [$("#ra-slider-range").slider("option", "values")[0], $("#ra-slider-range").slider("option", "values")[1]]
    //console.log(ra)
    return ra_range
  }

  function getDecline() {
    //This method is invoked when the pipeline is started
    let dec_range = [$("#dec-slider-range").slider("option", "values")[0], $("#dec-slider-range").slider("option", "values")[1]]
    //console.log(dec)
    return dec_range
  }

  let config = {
    container: "pv-vis",
    viewport: [2000, 4000],
    profiling: true
  }

  let app = pv(config)

  let confirmData = (evt) => {
    //allow users to click confirm parameters button after data has been selected
    document.getElementById("confirm-parameters-button").disabled = false;
    
    app.input({
      source: evt.target.files[0],
      batchSize: 50000,
      schema: { 
        st_delivname: 'string',
        kepid: 'int',
        tm_designation: 'string',
        ra: 'float',
        dec: 'float',
        kepmag: 'float',
        teff: 'int',
        teff_err1: 'int',
        teff_err2: 'int',
        teff_prov: 'string',
        logg: 'float',
        logg_err1: 'float',
        logg_err2: 'float',
        logg_prov: 'string',
        feh: 'float',
        feh_err1: 'float',
        feh_err2: 'float',
        feh_prov: 'string',
        radius: 'float',
        radius_err1: 'float',
        radius_err2: 'float',
        mass: 'float',
        mass_err1: 'float',
        mass_err2: 'float',
        dens: 'float',
        dens_err1: 'float',
        dens_err2: 'float',
        prov_sec: 'string',
        nconfp: 'int',
        nkoi: 'int',
        ntce: 'int',
        st_quarters: 'int',
        st_vet_date_str: 'string',
      }
    });
  }

  let analyseVisualise = () => {
    
    let ra_range = getRightAscension()
    let dec_range = getDecline()
    let binSize = calculateBinRatio(ra_range, dec_range)

    //define the views based on slider settings
    let views = [
      {
        id: 'map_tight', offset: [50,0],
        padding: {left: 80, right: 10, top: 20, bottom: 50},
        width: binSize[0], height: binSize[1],
      },
      {
        id: 'coordinates_chart', offset: [50, binSize[1]+50],
        padding: {left: 80, right: 10, top: 20, bottom: 50},
        width: 800, height: 600,
      }
    ]

    //upon confirming parameters, make all sliders and buttons inactive
    $( "#ra-slider-range" ).slider( "option", "disabled", true );
    $( "#dec-slider-range" ).slider( "option", "disabled", true );
    document.getElementById("confirm-parameters-button").disabled = true;
    document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" hidden />`
    //don't allow pressing of start until parameters are confirmed
    document.getElementById("start-button").disabled = false
    document.getElementById("next-button").disabled = false

    app.view(views)
    app.batch([
      {
        match: {
          ra: ra_range,
          dec: dec_range
        },
        aggregate: {
          $bin: [{ra: binSize[0]}, {dec: binSize[1]}],
          $collect: {
            map_values: {$count: '*'}
          },
        },
        out: 'map_tight'
      },  
      {
        match: {
          ra: ra_range
        },
        aggregate: {
          $bin: {ra: 12},
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
          x: 'ra', 
          y: 'dec',
        }
      },
      {
        visualize: {
          id: 'coordinates_chart',
          in: "chart1",
          mark: 'line',
          color: 'steelblue',
          x: 'ra', 
          y: 'chart_values'
        }
      },
    ])
    .interact([
      {
        event: ['pan','zoom'], 
        from: 'map_tight', 
        response: {
          map_aggr: {}
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
  document.getElementById('confirm-parameters-button').onclick = analyseVisualise
}


    

