// var availability = [];

var detailsContainer = document.querySelector(".details-container");

var details = {
  similarClickInit: function(availMatched){

    var showDetailsEl = document.querySelectorAll(".similar-results-el");

    for (var i = 0; i < showDetailsEl.length; i++){
      showDetailsEl[i].addEventListener("click",function(){
        details.getShowDetails(this.getAttribute("data-id"));
      }); // end of event listener for all similar els
    }; // end of for loop
  }, // end of similarClickInit

  getShowDetails: function(showID){
    var query = baseUrl + "/show/" + showID

    $.ajax({
      url: query,
    }).done(function(response){
      console.log(response);

      showDetails = {
         title: response.title,
         summary: response.overview,
         cast: function castList(){
           var cap = 5;
           if (response.cast.length < 5){
             cap = response.cast.length;
           }
           var castArray = [];

           for (var i = 0; i < cap; i++){
             castArray.push(" " + response.cast[i].name);
           };

           return castArray;
         },
         genre: function genreList(){

           var cap = 5;
           if (response.genres.length < 5){
             cap = response.genres.length;
           }
           var genreArray = [];

           for (var i = 0; i < cap; i++){
            //  console.log(response.genres[i].title);
             genreArray.push(" " + response.genres[i].title);
           };

           return genreArray;
         },
         airdate: response.first_aired,
         imdb: response.imdb_id,
         streaming: details.findMatchByID(showID).default_source_matches.join(", "), // fix this
       };

       details.appendData(showDetails);

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    }) // end of ajax call


  }, // end of getShowDetails

  findMatchByID: function(showID){

    for (var i = 0; i < availMatched.length; i++){
      console.log("showID", showID, "availMatched.id", availMatched[i].id);
      if (availMatched[i].id == showID){
        return availMatched[i];
      };
    };
    throw new Error("This should never happen!");

    //http://stackoverflow.com/questions/9298839/is-it-possible-to-stop-javascript-execution

  }, // end of findMatchByID


  appendData: function(showDetails){

    var templateSource = document.getElementById("show-details-template").innerHTML;

    var template = Handlebars.compile(templateSource);

    var computedHtml = template(showDetails);

    detailsContainer.innerHTML = computedHtml;

  }, // end of appendData

}; // end of details obj
