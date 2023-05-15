var searchText = document.getElementById("search-text");
var searchLength = document.getElementById("search-length");
var link = document.getElementById("source-link");
var author = document.getElementById("author");
var title = document.getElementById("poem-title");
var backBtn = document.getElementById("back-btn");
var lengthMap = {
		short: 5, 
  	medium: 14, 
  	long: 25
  };

var apiURL = (text,lines) => { return `https://poetrydb.org/lines,linecount,poemcount/${text};${lines};1`};

var clearPoem = (poemContainer) => {
  title.innerHTML = ""; 
  author.innerHTML = ""; 
	while (poemContainer.firstChild) {
  	poemContainer.removeChild(poemContainer.firstChild);
	}
}

/* https://poetrydb.org/lines,linecount,poemcount/desire;14;1 */
var search = () => {
  if (searchText.value.length>1){
    link.href=apiURL(searchText.value,lengthMap[searchLength.value])
    
    fetch(apiURL(searchText.value,lengthMap[searchLength.value]))
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          var paragraphs = document.getElementById("poem-lines");
          clearPoem(document.getElementById("poem-lines"));
          if(data[0] !== undefined){
              title.innerHTML = data[0].title; 
              author.innerHTML = `<span>by </span>${data[0].author}`; 
              data[0].lines.forEach( item => {
                var child = document.createElement("p");
                child.textContent = item;
                paragraphs.appendChild(child);
                document.getElementById("poem-section").style.display = "block";
                document.getElementById("search-form").style.display = "none";
                document.getElementById("poem-section").classList.remove("no-results")
                backBtn.textContent = "Discover Another Poem";
                
              });        
            } else {
                document.getElementById("poem-section").style.display = "block";

                var result = document.createElement("p");
                result.innerHTML = `Drat! We don't have a <span class="more-orange">${searchLength.value}</span> poem about <span class="more-orange">${searchText.value}</span>.`;
                paragraphs.appendChild(result);

                var message = document.createElement("p");
                message.innerHTML = 'Click "Help" in the nav above for recommendations for successful searches.';
                paragraphs.appendChild(message);
                message.classList.add("help-message");

                document.getElementById("poem-section").style.display = "block";
                document.getElementById("search-form").style.display = "none";
                document.getElementById("poem-section").classList.add("no-results")
                backBtn.textContent = "Try Another Search";

            }
        });
      } else console.log('Error: Network response was not ok.');
    });
  }
  return 
}

var searchAgain = ()=> {
  clearPoem(document.getElementById("poem-lines"));
  document.getElementById("poem-section").style.display = "none";
  document.getElementById("search-form").style.display = "block";
  searchText.value = "";
}


