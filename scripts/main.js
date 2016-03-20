document.addEventListener("DOMContentLoaded", function(event){

  var searchBtn = document.querySelector(".search-button");

  var inputBox = document.getElementById("show-input");

  inputBox.addEventListener("keydown", function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      onSearchClick();
      // console.log("enter key was pressed");
    };
  });

  searchBtn.addEventListener("click", onSearchClick);

  function onSearchClick() {
    // console.log("clicked");
    var showInput = inputBox.value;
    // console.log(showInput);

    if (showInput === "") {
      alert("Type in a show!");
      return;
    } // if showInput is empty

    availMatched = [];

    howManyMult.innerHTML = "";
    multMatchesInfo.innerHTML = "";
    similarContent.innerHTML = "";

    detailsContainer.innerHTML = "";
    detailsContainer.classList.add("hide");
    detailsContainer.style.background = "none";

    notes.innerHTML = "<p class='notes-larger'>Searching...</p><p><img class='loading-gif' src='./imgs/loading-tv.gif'></p>";

    // var sourcesInput = document.querySelectorAll("source-checkbox:checked");
    // // console.log("sourcesInput",sourcesInput);
    // if (sourcesInput.length > 0){
    //   for (var i = 0; i < sourcesInput.length; i++){
    //     userSourceChoices.push(sourcesInput[i].value);
    //   };
    // } else {
    //   userSourceChoices = defaultSources;
    // }

    console.log("userSourceChoices",userSourceChoices);

    // console.log("userSourceChoices",userSourceChoices);

    search.onSearch(showInput);

  };

}); // end of DOMContentLoaded;
