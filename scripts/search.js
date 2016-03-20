var baseUrl = "http://api-public.guidebox.com/v1.43/US/" + PUBLIC_KEY;

var userSourceChoices = [];
var defaultSources = ["Amazon","HBO","Hulu","Netflix","Showtime"];

var notes = document.querySelector(".notes-placeholder");
// var multContainer = document.querySelector(".mult-matches-container");
var howManyMult = document.querySelector(".how-many-mult");
var multMatchesInfo = document.querySelector(".mult-matches");

var search = {
  onSearch: function(show){
    // console.log("search input is being called");

    var query = baseUrl + "/search/title/" + show + "/exact";

    $.ajax({
      url: query,
    }).done(function(response){
      console.log("search response", response);

      if (response.results.length <= 0){
        notes.innerHTML = "<p>Sorry, couldn't find that show! Try another!</p>";
        return;
      }  else if (response.results.length > 1){
        search.foundMulti(response);
      } else if (response.results.length === 1){
        related.findSimilar(response.results[0].id);
        notes.innerHTML = "<p class='notes-larger'>Finding shows like " + response.results[0].title + "...</p><p><img class='loading-gif' src='./imgs/loading-tv.gif'></p>";
      };

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
      notes.innerHTML = "<p>Sorry, couldn't find that show! Try another!</p>";
    }); // end of ajax

  }, // end of onSearch

  foundMulti: function(response){
    notes.innerHTML = "";
    // multContainer.classList.remove("hide");
    howManyMult.innerHTML = ("We found " + response.results.length + " possible matches. Which did you want?");

    var matchData = {
      multiple: [],
    };

    for (var i = 0; i < response.results.length; i++){

      matchData.multiple[i] = {
        title: response.results[i].title,
        thumbnail: response.results[i].artwork_208x117,
        id: response.results[i].id,
      };
    };

    // console.log("matching data filled in", matchData);

    /*******Handlebars template for multiple matches*******/
    var templateSource = document.getElementById("mult-matches-template").innerHTML;

    var template = Handlebars.compile(templateSource);

    var computedHtml = template(matchData);

    multMatchesInfo.innerHTML = computedHtml;

    search.multiClickInit(matchData);

  }, // end of foundMulti

  multiClickInit: function(matchData){
    // console.log("matchData",matchData);

    var matchEls = document.querySelectorAll(".mult-matches-el");

    for (var i = 0; i < matchEls.length; i++){
      matchEls[i].addEventListener("click",function(){
        // console.log("this",this);
        var dataID = this.getAttribute("data-id");
        // console.log("dataID",dataID);

        notes.innerHTML = "<p class='notes-larger'>Finding shows like " + this.innerText + "...</p><p><img class='loading-gif' src='./imgs/loading-tv.gif'></p>";
        howManyMult.innerHTML = "";
        multMatchesInfo.innerHTML = "";
        // multContainer.classList.add("hide");
        related.findSimilar(dataID);
      });
    };

  }, // end of multiClickInit


}; // end of search obj
