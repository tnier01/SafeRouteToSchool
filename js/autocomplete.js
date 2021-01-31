

$(document).ready(function(){
 
    $('.autoComplete').typeahead({
        hint: true,
        highlight: true,
        minLength: 4,
        limit: Infinity,
     source: function(query, result)
     {
        console.log(query)
      $.ajax({
       url:"https://api.openrouteservice.org/geocode/autocomplete?api_key=" + token.routing + "&focus.point.lat=7.6&focus.point.lon=51.9&text=" +query,
       method:"GET",
       dataType:"json",
       success:function(data)
       {
        result($.map(data.features, function(item){
         return item.properties.label;
        }));
       }
      })
     }
    });
    
   });


 
   