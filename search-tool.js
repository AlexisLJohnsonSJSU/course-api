var searchText = document.getElementById("search-text");
var searchLength = document.getElementById("search-length");
var link = document.getElementById("test-link");
var lengthMap = {
		short: 5, 
  	medium: 14, 
  	long: 25
  };

var apiURL = (text,lines) => { return `https://poetrydb.org/lines,linecount,poemcount/${text};${lines};1`};

/* https://poetrydb.org/lines,linecount,poemcount/desire;14;1 */
var search = () => {
	console.log(searchText.value, searchLength.value, lengthMap[searchLength.value]);
  console.log(apiURL("test-text","90000"));
  
  link.href=apiURL(searchText.value,lengthMap[searchLength.value])
  console.log(link.href);
  
  fetch(apiURL(searchText.value,lengthMap[searchLength.value]))
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        console.log(data);
        var poemHTML=data[0].lines.flatMap(line => `<p>${line}</p>`).join("");
        document.getElementById("poem-lines").append(poemHTML);
/*         console.log(poemHTML); */
      });
    } else console.log('Network response was not ok.');
  });
  
  return 
}
search();


