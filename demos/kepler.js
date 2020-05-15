import pv from '..';
import makeSliders from './sliders'

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
    //console.log(ra_range)
    return ra_range
  }

  function getDecline() {
    //This method is invoked when the pipeline is started
    let dec_range = [$("#dec-slider-range").slider("option", "values")[0], $("#dec-slider-range").slider("option", "values")[1]]
    //console.log(dec_range)
    return dec_range
  }

  function getMagnitude() {
    //This method is invoked when the pipeline is started
    let mag_range = [$("#mag-slider-range").slider("option", "values")[0], $("#mag-slider-range").slider("option", "values")[1]]
    //console.log(mag_range)
    return mag_range
  }

  function getSurfTemp() {
    //This method is invoked when the pipeline is started
    let temp_range = [$("#temp-slider-range").slider("option", "values")[0], $("#temp-slider-range").slider("option", "values")[1]]
    //console.log(temp_range)
    return temp_range
  }

  function getSurfGrav() {
    //This method is invoked when the pipeline is started
    let grav_range = [$("#grav-slider-range").slider("option", "values")[0], $("#grav-slider-range").slider("option", "values")[1]]
    //console.log(grav_range)
    return grav_range
  }

  function getMetallicity() {
    //This method is invoked when the pipeline is started
    let metal_range = [$("#metallicity-slider-range").slider("option", "values")[0], $("#metallicity-slider-range").slider("option", "values")[1]]
    //console.log(metal_range)
    return metal_range
  }

  function getRadius() {
    //This method is invoked when the pipeline is started
    let radius_range = [$("#radius-slider-range").slider("option", "values")[0], $("#radius-slider-range").slider("option", "values")[1]]
    //console.log(radius_range)
    return radius_range
  }

  function getMass() {
    //This method is invoked when the pipeline is started
    let mass_range = [$("#mass-slider-range").slider("option", "values")[0], $("#mass-slider-range").slider("option", "values")[1]]
    //console.log(mass_range)
    return mass_range
  }

  function getDensity() {
    //This method is invoked when the pipeline is started
    let density_range = [$("#density-slider-range").slider("option", "values")[0], $("#density-slider-range").slider("option", "values")[1]]
    //console.log(density_range)
    return density_range
  }

  function disableButtonsAndSliders() {
    //upon confirming parameters, make all sliders and buttons inactive
    $( "#ra-slider-range" ).slider( "option", "disabled", true );
    $( "#dec-slider-range" ).slider( "option", "disabled", true );
    $( "#mag-slider-range" ).slider( "option", "disabled", true );
    $( "#temp-slider-range" ).slider( "option", "disabled", true );
    $( "#grav-slider-range" ).slider( "option", "disabled", true );
    $( "#metallicity-slider-range" ).slider( "option", "disabled", true );
    $( "#radius-slider-range" ).slider( "option", "disabled", true );
    $( "#mass-slider-range" ).slider( "option", "disabled", true );
    $( "#density-slider-range" ).slider( "option", "disabled", true );

    document.getElementById("confirm-parameters-button").disabled = true;
    document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" disabled />`
    //don't allow pressing of start until parameters are confirmed
    document.getElementById("start-button").disabled = false
    document.getElementById("next-button").disabled = false
  }

  function enableButtonsAndSliders() {
    //upon confirming parameters, make all sliders and buttons inactive
    $( "#ra-slider-range" ).slider( "option", "disabled", false );
    $( "#dec-slider-range" ).slider( "option", "disabled", false );
    $( "#mag-slider-range" ).slider( "option", "disabled", false );
    $( "#temp-slider-range" ).slider( "option", "disabled", false );
    $( "#grav-slider-range" ).slider( "option", "disabled", false );
    $( "#metallicity-slider-range" ).slider( "option", "disabled", false );
    $( "#radius-slider-range" ).slider( "option", "disabled", false );
    $( "#mass-slider-range" ).slider( "option", "disabled", false );
    $( "#density-slider-range" ).slider( "option", "disabled", false );

    document.getElementById("confirm-parameters-button").disabled = false;
    document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" />`
    //don't allow pressing of start until parameters are confirmed
    document.getElementById("start-button").disabled = true
    document.getElementById("next-button").disabled = true
  }

  let config = {
    container: "pv-vis",
    viewport: [2000, 4000],
    profiling: true
  }

  let app = pv(config)

  let datasetSize;
  let batchSize;
  let n = 1
  let dataset;

  let confirmData = (evt) => {
    //allow users to click confirm parameters button after data has been selected
    document.getElementById("confirm-parameters-button").disabled = false;
    datasetSize = evt.target.files[0].size
    dataset = evt.target.files[0]
  }

  let analyseVisualise = () => {
    // check which GPU selection has been made to determine batch size for optimal fluidity
    if (document.getElementById("lowGPU").checked) {
      batchSize = 100000
    } else if (document.getElementById("medGPU").checked) {
      batchSize = 500000
    } else if (document.getElementById("highGPU").checked){
      batchSize = 1000000
    } else {
      batchSize = 2500000
    }
    app.input({
      source: dataset,
      batchSize: batchSize,
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
    
    let ra_range = getRightAscension()
    let dec_range = getDecline()
    let binSize = calculateBinRatio(ra_range, dec_range)

    let mag_range = getMagnitude()
    let temp_range = getSurfTemp()
    let grav_range = getSurfGrav()
    let metal_range = getMetallicity()
    let radius_range = getRadius()
    let mass_range = getMass()
    let density_range = getDensity()

    //define the views based on slider settings
    let views = [
      {
        id: 'coordinate_map', offset: [0,0],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: binSize[0], height: binSize[1],
        legend: true
      },
      {
        id: 'temp_distribution', offset: [binSize[0], 5],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 500, height: 500,
      },
      {
        id: 'mag_distribution', offset: [binSize[0]+500, 5],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 500, height: 500,
      },
      {
        id: 'mass_distribution', offset: [binSize[0], 505],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 500, height: 500,
      },
      {
        id: 'radius_distribution', offset: [binSize[0]+500, 505],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 500, height: 500,
      },
      {
        id: 'gravity_distribution', offset: [50, binSize[1]+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 800, height: 600,
      },
      {
        id: 'density_distribution', offset: [50, binSize[1]+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 800, height: 600,
      },
      {
        id: 'metallicity_distribution', offset: [50, binSize[1]+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 800, height: 600,
      },
    ]


    disableButtonsAndSliders()
    

    app.view(views)
    app.batch([
      {
        match: {
          ra: ra_range,
          dec: dec_range,
          kepmag: mag_range,
          teff: temp_range,
          logg: grav_range,
          feh: metal_range,
          radius: radius_range,
          mass: mass_range,
          dens: density_range
        },
        aggregate: {
          $bin: [{ra: binSize[0]}, {dec: binSize[1]}],
          $collect: {
            map_values: {$count: '*'}
          },
        },
        out: 'coordinate_map'
      },  
      {
        match: {
          ra: ra_range,
          dec: dec_range,
          kepmag: mag_range,
          teff: temp_range,
          logg: grav_range,
          feh: metal_range,
          radius: radius_range,
          mass: mass_range,
          dens: density_range
        },
        aggregate: {
          $bin: {teff: 250},
          $collect: {
            temp_count: {$count: '*'},
            temp_min: {$max: '*'},
            temp_max: {$min: '*'},
            temp_avg: {$avg: '*'}
          },
        },
        out: 'temp_distribution'
      },
      {
        match: {
          ra: ra_range,
          dec: dec_range,
          kepmag: mag_range,
          teff: temp_range,
          logg: grav_range,
          feh: metal_range,
          radius: radius_range,
          mass: mass_range,
          dens: density_range
        },
        aggregate: {
          $bin: {kepmag: 250},
          $collect: {
            mag_count: {$count: '*'},
            mag_min: {$max: '*'},
            mag_max: {$min: '*'},
            mag_avg: {$avg: '*'}
          },
        },
        out: 'mag_distribution'
      },
      {
        match: {
          ra: ra_range,
          dec: dec_range,
          kepmag: mag_range,
          teff: temp_range,
          logg: grav_range,
          feh: metal_range,
          radius: radius_range,
          mass: mass_range,
          dens: density_range
        },
        aggregate: {
          $bin: {mass: 250},
          $collect: {
            mass_count: {$count: '*'},
            mass_min: {$max: '*'},
            mass_max: {$min: '*'},
            mass_avg: {$avg: '*'}
          },
        },
        out: 'mass_distribution'
      },
      {
        match: {
          ra: ra_range,
          dec: dec_range,
          kepmag: mag_range,
          teff: temp_range,
          logg: grav_range,
          feh: metal_range,
          radius: radius_range,
          mass: mass_range,
          dens: density_range
        },
        aggregate: {
          $bin: {radius: 5},
          $collect: {
            radius_count: {$count: '*'},
            radius_min: {$max: '*'},
            radius_max: {$min: '*'},
            radius_avg: {$avg: '*'}
          },
        },
        out: 'radius_distribution'
      }
    ]).progress([
      {
        visualize: {
          id: 'coordinate_map',
          in: 'coordinate_map',
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
          id: 'temp_distribution',
          in: "temp_distribution",
          mark: 'line',
          color: 'teal',
          x: 'teff', 
          y: 'temp_count'
        }
      },
      {
        visualize: {
          id: 'mag_distribution',
          in: "mag_distribution",
          mark: 'line',
          color: 'teal',
          x: 'kepmag', 
          y: 'mag_count'
        }
      },
      {
        visualize: {
          id: 'mass_distribution',
          in: "mass_distribution",
          mark: 'line',
          color: 'teal',
          x: 'mass', 
          y: 'mass_count'
        }
      },
      {
        visualize: {
          id: 'radius_distribution',
          in: "radius_distribution",
          mark: 'bar',
          color: 'teal',
          x: 'radius', 
          height: 'radius_count'
        }
      },
    ])
    .interact([
      {
        event: ['brush'], 
        from: 'coordinate_map', 
        response: {
          radius_distribution: {selected: {color: 'orange'}}
        }
      },
    ])
    // .annotate([
    //   {
    //     id: 'temp_distribution',

    //   }
    // ])
    .onEach(function() {
      let progress = (((n * batchSize) / datasetSize) * 100)
      progress = (progress > 100 ? progress = 100 : progress = progress)
      document.getElementById('stats').innerHTML = 'DATA PROCESSED: ' + progress.toFixed(2) + ' %';
      n += 1
      if (progress === 100) {
        enableButtonsAndSliders()
      }
    })
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
    window.scrollTo(0, 550)
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


    

