fetch('https://httpbin.org/ip')
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        console.log(data);
      });
    } else console.log('Network response was not ok.');
  });