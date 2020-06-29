
'use strict';

const apiKey = 'r3jILMQZkXic56riXzLfUPJTt2gZIzarkItsVxyp'; 

const searchURL = 'https://api.nasa.gov/planetary/apod';

let clickCount=0;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson); 

  $('.box1, .box2, .box3, .box4').css({"background-image": "url("+responseJson.hdurl+")", "color": "white", "background-repeat": "no-repeat", "background-position":"center", "background-size": "cover"});
  $('.results').removeClass('hidden');
  $('input[type=text]').val("");
  $('textarea').append(
    `<img src="${responseJson.hdurl}">
    `)
};

function setText(element){
  document.getElementById("content").innerHTML = element.value;
}


function addStylingToText(){
  $("#fonts").change(function() {
    $('div p, textarea').css("font-family", $(this).val());
  });
  $("#size").change(function() {
    $('div p, textarea').css("font-size", $(this).val() + "px");
  });
  $("#color").change(function(){
    $('div p, textarea').css("color", $(this).val());
  });
}

addStylingToText();

function getAPOD(query) {
  const params = {
    api_key: apiKey,
    date: query,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchDate = $('#js-search-date').val();
    getAPOD(searchDate);
    clickCount++;
  });
}

$(watchForm);

