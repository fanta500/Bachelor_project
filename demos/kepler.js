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
    return [raRatio*2048*2, decRatio*2048*2]
  }

  function calculateBinSizeFactor(atr) {
    let atrMaxRange;
    let atrCurrRange;
    let atrRatio;

    switch (atr) {
      case "mag":
        atrMaxRange = $("#mag-slider-range").slider("option", "max") - $("#mag-slider-range").slider("option", "min")
        atrCurrRange = getMagnitude()[1] - getMagnitude()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "temp":
        atrMaxRange = $("#temp-slider-range").slider("option", "max") - $("#temp-slider-range").slider("option", "min")
        atrCurrRange = getSurfTemp()[1] - getSurfTemp()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "grav":
        atrMaxRange = $("#grav-slider-range").slider("option", "max") - $("#grav-slider-range").slider("option", "min")
        atrCurrRange = getSurfGrav()[1] - getSurfGrav()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "metallicity":
        atrMaxRange = $("#metallicity-slider-range").slider("option", "max") - $("#metallicity-slider-range").slider("option", "min")
        atrCurrRange = getMetallicity()[1] - getMetallicity()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "radius":
        atrMaxRange = $("#radius-slider-range").slider("option", "max") - $("#radius-slider-range").slider("option", "min")
        atrCurrRange = getRadius()[1] - getRadius()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "mass":
        atrMaxRange = $("#mass-slider-range").slider("option", "max") - $("#mass-slider-range").slider("option", "min")
        atrCurrRange = getMass()[1] - getMass()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
      case "density":
        atrMaxRange = $("#density-slider-range").slider("option", "max") - $("#density-slider-range").slider("option", "min")
        atrCurrRange = getDensity()[1] - getDensity()[0]
        atrRatio = atrCurrRange / atrMaxRange
        return atrRatio
    }
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

  function getPlanets() {
    //This method is invoked when the pipeline is started
    let planets_range = [$("#planets-slider-range").slider("option", "values")[0], $("#planets-slider-range").slider("option", "values")[1]]
    //console.log(planets_range)
    return planets_range
  }

  function getKOIs() {
    //This method is invoked when the pipeline is started
    let KOIs_range = [$("#KOIs-slider-range").slider("option", "values")[0], $("#KOIs-slider-range").slider("option", "values")[1]]
    //console.log(KOIs_range)
    return KOIs_range
  }

  function getTCEs() {
    //This method is invoked when the pipeline is started
    let TCEs_range = [$("#TCEs-slider-range").slider("option", "values")[0], $("#TCEs-slider-range").slider("option", "values")[1]]
    //console.log(TCEs_range)
    return TCEs_range
  }

  function getResolution() {
    return $("#resolution_slider").slider("value")/100
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
    $( "#planets-slider-range" ).slider( "option", "disabled", true );
    $( "#KOIs-slider-range" ).slider( "option", "disabled", true );
    $( "#TCEs-slider-range" ).slider( "option", "disabled", true );
    $( "#resolution_slider" ).slider( "option", "disabled", true );

    document.getElementById("confirm-parameters-button").disabled = true;
    document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" disabled />`
    document.getElementById('GPU-settings').disabled = true;
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
    $( "#planets-slider-range" ).slider( "option", "disabled", false );
    $( "#KOIs-slider-range" ).slider( "option", "disabled", false );
    $( "#TCEs-slider-range" ).slider( "option", "disabled", false );
    $( "#resolution_slider" ).slider( "option", "disabled", false );

    document.getElementById("confirm-parameters-button").disabled = false;
    document.getElementById('p5-control').innerHTML = `<input type="file" id="input-file" />`
    //don't allow pressing of start until parameters are confirmed
    document.getElementById("start-button").disabled = true
    document.getElementById("next-button").disabled = true
  }

  let config = {
    container: "pv-vis",
    viewport: [1850, 2500],
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
      },
    });

    let mapDim = 925
    //define the views based on slider settings
    let views = [
      // the map
      {
        id: 'coordinate_map', offset: [0,0],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: mapDim, height: mapDim,
        legend: true,
        profiling: true
      },
      //row 1 right of map
      {
        id: 'temp_distribution', offset: [mapDim, 5],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 455, height: 455,
        xAxis: {
          ticks: 5,
        },
        gridlines: {y: true}
      },
      {
        id: 'mag_distribution', offset: [mapDim+455, 5],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 455, height: 455,
        xAxis: {
          ticks: 5,
        },
        gridlines: {y: true}
      },
      // row 2 right of map
      {
        id: 'mass_distribution', offset: [mapDim, 460],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 455, height: 455,
        xAxis: {
          ticks: 10
        },
        gridlines: {y: true}
      },
      {
        id: 'radius_distribution', offset: [mapDim+455, 460],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 455, height: 455,
        xAxis: {
          ticks: 5,
        },
        gridlines: {y: true}
      },
      // row 1 below map
      {
        id: 'planetsInSystem', offset: [50, mapDim+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        gridlines: {y: true}
      },
      {
        id: 'KOIsInSystem', offset: [600+50, mapDim+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        gridlines: {y: true}
      },
      {
        id: 'TCEsInSystem', offset: [2*600+50, mapDim+50],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        gridlines: {y: true}
      },
      // row 2 below map
      {
        id: 'gravity_distribution', offset: [50, mapDim+50+500],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        xAxis: {
          ticks: 10
        },
        gridlines: {y: true}
      },
      {
        id: 'density_distribution', offset: [600+50, mapDim+50+500],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        xAxis: {
          ticks: 10
        },
        gridlines: {y: true}
      },
      {
        id: 'metallicity_distribution', offset: [2*600+50, mapDim+50+500],
        padding: {left: 80, right: 10, top: 10, bottom: 60},
        width: 600, height: 500,
        xAxis: {
          ticks: 10
        },
        gridlines: {y: true}
      },
    ]

    disableButtonsAndSliders()
    
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
    let planets_range = getPlanets()
    let KOIs_range = getKOIs()
    let TCEs_range = getTCEs()
    let resolution = getResolution()

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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: [{ra: Math.ceil(binSize[0]*resolution)}, {dec: Math.ceil(binSize[1]*resolution)}],
          $collect: {
            star_count: {$count: '*'},
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range,
        },
        aggregate: {
          $bin: {teff: Math.ceil(150*calculateBinSizeFactor("temp"))},
          $collect: {
            temp_count: {$count: 'teff'},
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {kepmag: Math.ceil(150*calculateBinSizeFactor("mag"))},
          $collect: {
            mag_count: {$count: 'kepmag'},
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {mass: Math.ceil(150*calculateBinSizeFactor("mass"))},
          $collect: {
            mass_count: {$count: 'mass'},
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {radius: Math.ceil(150*calculateBinSizeFactor("radius"))},
          $collect: {
            radius_count: {$count: 'radius'},
          },
        },
        out: 'radius_distribution'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $group: 'nconfp',
          $collect: {
            planets_count: {$count: 'nconfp'},
          },
        },
        out: 'planets'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $group: 'nkoi',
          $collect: {
            KOIs_count: {$count: 'nkoi'},
          },
        },
        out: 'KOIs'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $group: 'ntce',
          $collect: {
            TCEs_count: {$count: 'ntce'},
          },
        },
        out: 'TCEs'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {logg: Math.ceil(150*calculateBinSizeFactor("grav"))},
          $collect: {
            gravity_count: {$count: 'logg'},
          },
        },
        out: 'gravity_distribution'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {dens: Math.ceil(150*calculateBinSizeFactor("density"))},
          $collect: {
            density_count: {$count: 'dens'},
          },
        },
        out: 'density_distribution'
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
          dens: density_range,
          nconfp: planets_range,
          nkoi: KOIs_range,
          ntce: TCEs_range
        },
        aggregate: {
          $bin: {feh: Math.ceil(150*calculateBinSizeFactor("metallicity"))},
          $collect: {
            metallicity_count: {$count: 'feh'},
          },
        },
        out: 'metallicity_distribution'
      },
    ]).progress([
      {
        visualize: {
          id: 'coordinate_map',
          in: 'coordinate_map',
          mark: 'rect',
          color: {
            field: 'star_count',
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
          mark: 'spline',
          color: 'teal',
          x: 'teff',
          y: 'temp_count',

        }
      },
      {
        visualize: {
          id: 'mag_distribution',
          in: "mag_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'kepmag', 
          y: 'mag_count'
        }
      },
      {
        visualize: {
          id: 'mass_distribution',
          in: "mass_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'mass', 
          y: 'mass_count'
        }
      },
      {
        visualize: {
          id: 'radius_distribution',
          in: "radius_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'radius',
          y: 'radius_count'
        }
      },
      {
        visualize: {
          id: 'planetsInSystem',
          in: "planets",
          mark: 'bar',
          color: {
            field: 'planets_count',
            exponent: 0.1
          },
          x: 'nconfp', 
          height: 'planets_count',
        }
      },
      {
        visualize: {
          id: 'KOIsInSystem',
          in: "KOIs",
          mark: 'bar',
          color: {
            field: 'KOIs_count',
            exponent: 0.1
          },
          x: 'nkoi', 
          height: 'KOIs_count'
        }
      },
      {
        visualize: {
          id: 'TCEsInSystem',
          in: "TCEs",
          mark: 'bar',
          color: {
            field: 'TCEs_count',
            exponent: 0.1
          },
          x: 'ntce', 
          height: 'TCEs_count'
        }
      },
      {
        visualize: {
          id: 'gravity_distribution',
          in: "gravity_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'logg', 
          y: 'gravity_count'
        }
      },
      {
        visualize: {
          id: 'density_distribution',
          in: "density_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'dens', 
          y: 'density_count'
        }
      },
      {
        visualize: {
          id: 'metallicity_distribution',
          in: "metallicity_distribution",
          mark: 'spline',
          color: 'teal',
          x: 'feh', 
          y: 'metallicity_count'
        }
      },
    ])
    // .interact([
    //   {
    //     event: ['pan','zoom'], 
    //     from: 'temp_distribution', 
    //     response: {
    //       metallicity_distribution: {}
    //     }
    //   },
    // ])
    .onEach(function() {
      let progress = (((n * batchSize) / datasetSize) * 100)
      progress = (progress > 100 ? progress = 100 : progress = progress)
      document.getElementById('stats').innerHTML = 'DATA PROCESSED: ' + progress.toFixed(2) + ' %';
      n += 1
      // if (progress === 100) {
      //   enableButtonsAndSliders()
      // }
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
    //window.scrollTo(0, 570)
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


    

