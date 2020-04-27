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
}
