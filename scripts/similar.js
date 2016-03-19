var availContent = []; // will hold matches of user sources and available sources

var similarContent = document.querySelector(".content-container");

var availMatched = [];

var related = {
  findSimilar: function(showID){
    var query = baseUrl + "/show/" + showID + "/related";

    $.ajax({
      url: query,
    }).done(function(response){
      // console.log("related response", response);

      var similarArray = response.results;
      similarArray = similarArray.reverse(); // because the availContent fxn loops backwards
      console.log("similarArray",similarArray);


      // start of internal available_content fxn

      /*** source: how to delay a loop using self-invoking functions: http://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/ ***/

      (function delayedAvailContent(n) {
        setTimeout(function () {
          // console.log("n",n);
          var availQuery = baseUrl + "/show/" + similarArray[n].id + "/available_content";
          // console.log(availQuery);

          $.ajax({
            url: availQuery,
            context:similarArray[n],
          }).done(function(availResponse){
            console.log(availResponse);
            // console.log("is this delayed?");

            var whereAvail = availResponse.results.web.episodes.all_sources;


            if (related.doesItMatch(whereAvail)) {
              // console.log("starting dump");
              // console.log(related.getSourceMatches(whereAvail));
              similarArray[n]["all_sources"] = whereAvail;
              similarArray[n]["default_source_matches"] = related.getSourceMatches(whereAvail);
              availMatched.push(similarArray[n]);
            };

            if (n > 0 && availMatched.length < 5) {          // If i > 0, keep going
              delayedAvailContent(n - 1);       // Call the loop again, and pass it the current value of i
            } else{
              // console.log("all done...");
              console.log("availMatched", availMatched);
              related.showSimilar(availMatched);
              // details.loadShowDetails(availMatched);

            };


          }).fail(function(availResponse){
            console.log("it failed");
            console.log(availResponse);
          }) // end of inner ajax call

        }, 1500);
      })(similarArray.length - 1);


      // end of internal available_content fxn

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    }); // end of ajax


  }, // end of findSimilar

  doesItMatch(whereAvail){

    for (var i = 0; i < userSourceChoices.length; i++){
      for (var j = 0; j < whereAvail.length; j++){
        if (whereAvail[j].display_name.toLowerCase().indexOf(userSourceChoices[i].toLowerCase()) > -1){
          // console.log("they match", userSourceChoices[i]);
          return true;
        };
      }; // end of inner for loop
    }; //end of outer for loop
    return false;

  }, // end of doesItMatch

  getSourceMatches(whereAvail){

    var result = [];

    for (var j = 0; j < defaultSources.length; j++){
      for (var i = 0; i < whereAvail.length; i++){
        // console.log(j, defaultSources[j], i, whereAvail[i]);
        if (whereAvail[i].display_name.toLowerCase().indexOf(defaultSources[j].toLowerCase()) > -1){
          // console.log("found", defaultSources[j], whereAvail[i].display_name);
          result.push(defaultSources[j]);
          break;
        };
      }; // end of inner for loop
    }; //end of outer for loop
    return result;

  }, // end of getSourceMatches


  showSimilar: function(availMatched){
    var data = {
      similar: [],
    };

    for (var i = 0; i < availMatched.length; i++){
      data.similar[i] = {
        title: availMatched[i].title,
        thumbnail: availMatched[i].artwork_208x117,
        id: availMatched[i].id,
        sources: availMatched[i].default_source_matches.join(", "),
      };
    }; // end of for loop

    // console.log("data filled in", data);

    /*****Handlebars template*****/
    var templateSource = document.getElementById("similar-results-template").innerHTML;

    var template = Handlebars.compile(templateSource);

    var computedHtml = template(data);

    similarContent.innerHTML = computedHtml;

    notes.innerHTML = "";

    // console.log("availMatched",availMatched);

    details.similarClickInit(availMatched);

  }, // end of showSimilar

} // end of related obj
