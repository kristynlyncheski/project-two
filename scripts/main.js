document.addEventListener("DOMContentLoaded", function(event){

  var searchBtn = document.getElementById("search-button");

  searchBtn.addEventListener("click",function(){
    // console.log("clicked");
    var showInput = document.getElementById("show-input").value;
    // console.log(showInput);

    if (showInput === "") {
      alert("Type in a show!");
      return;
    } // if showInput is empty

    notes.innerHTML = "<p>Searching...</p>";

    var sourcesInput = document.querySelectorAll(".source-checkbox:checked");
    console.log("sourcesInput",sourcesInput);
    if (sourcesInput.length > 0){
      for (var i = 0; i < sourcesInput.length; i++){
        sourcesArray.push(sourcesInput[i].value);
      };
    } else {
      sourcesArray = ["amazon","hbo","hulu","netflix","showtime"];
    }

    console.log("sourcesArray",sourcesArray);

    search.onSearch(showInput);

  });

}); // end of DOMContentLoaded;
