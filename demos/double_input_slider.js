export default function() {
  $( function() {
    $( "#ra-slider-range" ).slider({
      range: true,
      min: 279,
      max: 302,
      values: [ 279, 302 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#ra_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#ra_min" ).val(ui.values[ 0 ]);
      $( "#ra_max" ).val(ui.values[ 1 ]);
      }
    });
    $( "#ra_range" ).val( $( "#ra-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#ra-slider-range" ).slider( "values", 1 ) );
    $( "#ra_min" ).val($( "#ra-slider-range" ).slider( "values", 0 ));
    $( "#ra_max" ).val($( "#ra-slider-range" ).slider( "values", 1 ));
  } );
   
  $( function() {
    $( "#dec-slider-range" ).slider({
      range: true,
      min: 36,
      max: 53,
      values: [ 36, 53 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#dec_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#dec_min" ).val(ui.values[ 0 ]);
      $( "#dec_max" ).val(ui.values[ 1 ]);
      }
    });
    $( "#dec_range" ).val( $( "#dec-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#dec-slider-range" ).slider( "values", 1 ) );
    $( "#dec_min" ).val($( "#dec-slider-range" ).slider( "values", 0 ));
    $( "#dec_max" ).val($( "#dec-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#mag-slider-range" ).slider({
      range: true,
      min: 5,
      max: 21,
      values: [ 5, 21 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#mag_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#mag_min" ).val(ui.values[ 0 ]);
      $( "#mag_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#mag_range" ).val( $( "#mag-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#mag-slider-range" ).slider( "values", 1 ) );
    $( "#mag_min" ).val($( "#mag-slider-range" ).slider( "values", 0 ));
    $( "#mag_max" ).val($( "#mag-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#temp-slider-range" ).slider({
      range: true,
      min: 2500,
      max: 27730,
      values: [ 2500, 27730 ],
      step: 10,
      slide: function( event, ui ) {
      $( "#temp_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#temp_min" ).val(ui.values[ 0 ]);
      $( "#temp_max" ).val(ui.values[ 1 ]);
      }
    });
    $( "#temp_range" ).val( $( "#temp-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#temp-slider-range" ).slider( "values", 1 ) );
    $( "#temp_min" ).val($( "#temp-slider-range" ).slider( "values", 0 ));
    $( "#temp_max" ).val($( "#temp-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#grav-slider-range" ).slider({
      range: true,
      min: -0.2,
      max: 6,
      values: [ -0.2, 6 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#grav_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#grav_min" ).val(ui.values[ 0 ]);
      $( "#grav_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#grav_range" ).val( $( "#grav-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#grav-slider-range" ).slider( "values", 1 ) );
    $( "#grav_min" ).val($( "#grav-slider-range" ).slider( "values", 0 ));
    $( "#grav_max" ).val($( "#grav-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#metallicity-slider-range" ).slider({
      range: true,
      min: -2,
      max: 0.6,
      values: [ -2, 0.6 ],
      step: 0.05,
      slide: function( event, ui ) {
      $( "#metallicity_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#metallicity_min" ).val(ui.values[ 0 ]);
      $( "#metallicity_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#metallicity_range" ).val( $( "#metallicity-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#metallicity-slider-range" ).slider( "values", 1 ) );
    $( "#metallicity_min" ).val($( "#metallicity-slider-range" ).slider( "values", 0 ));
    $( "#metallicity_max" ).val($( "#metallicity-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#radius-slider-range" ).slider({
      range: true,
      min: 0.1,
      max: 301,
      values: [ 0.1, 301 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#radius_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#radius_min" ).val(ui.values[ 0 ]);
      $( "#radius_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#radius_range" ).val( $( "#radius-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#radius-slider-range" ).slider( "values", 1 ) );
    $( "#radius_min" ).val($( "#radius-slider-range" ).slider( "values", 0 ));
    $( "#radius_max" ).val($( "#radius-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#mass-slider-range" ).slider({
      range: true,
      min: 0,
      max: 4,
      values: [ 0, 4 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#mass_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#mass_min" ).val(ui.values[ 0 ]);
      $( "#mass_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#mass_range" ).val( $( "#mass-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#mass-slider-range" ).slider( "values", 1 ) );
    $( "#mass_min" ).val($( "#mass-slider-range" ).slider( "values", 0 ));
    $( "#mass_max" ).val($( "#mass-slider-range" ).slider( "values", 1 ));
  } );

  $( function() {
    $( "#density-slider-range" ).slider({
      range: true,
      min: 0,
      max: 117,
      values: [ 0, 117 ],
      step: 0.1,
      slide: function( event, ui ) {
      $( "#density_range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      $( "#density_min" ).val(ui.values[ 0 ]);
      $( "#density_max" ).val(ui.values[ 1 ]);
    }
  });
    $( "#density_range" ).val( $( "#density-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#density-slider-range" ).slider( "values", 1 ) );
    $( "#density_min" ).val($( "#density-slider-range" ).slider( "values", 0 ));
    $( "#density_max" ).val($( "#density-slider-range" ).slider( "values", 1 ));
  } );
}
