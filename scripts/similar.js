var availContent = []; // will hold matches of user sources and available sources

// var availContent = [
//   {
//     hulu: true,
//     amazon:false,
//   },
//
// ]

var related = {
  findSimilar: function(showID){

    var query = baseUrl + "/show/" + showID + "/related";

    $.ajax({
      url: query,
    }).done(function(response){
      console.log("related response", response);

      var similarArray = response.results;
      similarArray = similarArray.reverse(); // because the availContent fxn loops backwards
      console.log("similarArray",similarArray);


      // start of internal available_content fxn

      /*** source: how to delay a loop using self-invoking functions: http://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/ ***/

      (function delayedAvailContent(n) {
        setTimeout(function () {
          console.log("n",n);
          var availQuery = baseUrl + "/show/" + similarArray[n].id + "/available_content";
          console.log(availQuery);

          $.ajax({
            url: availQuery,
            context:similarArray[n],
          }).done(function(availResponse){
            console.log(availResponse);
            // console.log("is this delayed?")
            // console.log("sourcesArray", sourcesArray);

            var availSourcesArray = availResponse.results.web.episodes.all_sources;
            console.log("availSourcesArray",availSourcesArray);


            for (i = 0; i < sourcesArray.length; i++){
              availContent[i] = {};
              availContent[i]["hello"] = "hi";



            //  for (j = 0; j < availSourcesArray.length; j++){


              //  if (availSourcesArray[j].display_name.toLowerCase().indexOf(sourcesArray[i]) > -1){
              //    console.log("found a match");
              //    availContent.match[i][sourcesArray[i]] = true;
              //  } else {
              //    availContent.match[i][sourcesArray[i]] = false;
              //  } // end of if/else for comparing sources
            //  } // end of j for loop
           }; // end of i for loop

           console.log("availContent",availContent)


          }).fail(function(availResponse){
            console.log("it failed");
            console.log(availResponse);
          }) // end of inner ajax call

          if (n > 0) {          // If i > 0, keep going
            delayedAvailContent(n - 1);       // Call the loop again, and pass it the current value of i
          }
        }, 1500);
      })(similarArray.length - 1);

      // end of internal available_content fxn




      // related.showData(response);

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    }); // end of ajax


  }, // end of findSimilar


  showData: function(similarArray){
    var data = {
      similar: [],
    };

    for (var i = 0; i < similarArray.length; i++){
      data.similar[i] = {
        title: similarArray[i].title,
        thumbnail: similarArray[i].artwork_208x117,
        id: similarArray[i].id,
      };
    }; // end of for loop

    console.log("data filled in", data);


    /*****Handlebars template*****/
    var templateSource = document.getElementById("similar-results-template").innerHTML;

    var template = Handlebars.compile(templateSource);

    var computedHtml = template(data);

    var similarContent = document.querySelector(".content-container");
    similarContent.innerHTML = computedHtml;

  }, // end of showData



} // end of related obj
