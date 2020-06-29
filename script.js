
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
  $('.box').removeClass('hidden')
  $('.box').css({"background-image": "url("+responseJson.hdurl+")", "color": "white", "background-repeat": "no-repeat", "background-position":"center", "background-size": "cover"});
  $('.results').removeClass('hidden');
  $('input[type=text]').val("");
  //$("body").css('background-image', 'none');
  //$('h1,label').css("color", "black");
};


function setText(element){
  document.getElementById("content").innerHTML = element.value;
}


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


function removePage(){
  $('.removePage').addClass('hidden');
  $('.newPage').removeClass('hidden');
  $('h5').addClass('hidden');
  $('.flex-container > li:hover > div').css('transform', "scale(1.0)");
};

function theNewPage(){
  $('li div').click(function(){
    removePage();
  })};


  function addStylingToText(){
    $("#fonts").change(function() {
      $('p#content, textarea').css("font-family", $(this).val());
    });
    $("#size").change(function() {
      $('p#content, textarea').css("font-size", $(this).val() + "px");
    });
    $("#color").change(function(){
      $('p#content, textarea').css("color", $(this).val());
    });
  };

/*
$('p#content').removeClass('center')
     $('p#content').addClass($(this).val())
     $('p#content').removeClass($(this).val())
   
   let previous = center;
       if ($(this).val('bottom-right')){
       $('p#content').removeClass(previous);
        previous = $(this).val();
      $('p#content').addClass('previous');


        $("#align").change(function(){
      if ($(this).val('bottom-right')){
      $('p#content').css({"bottom":"8px", "right":"16px"});
}})
*/



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchDate = $('#js-search-date').val();
    getAPOD(searchDate);
    clickCount++;
    theNewPage();
    addStylingToText();
  });
}



$(watchForm);














