
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
  $('.box, .explanation').removeClass('hidden');
  $('.box').css({"background-image": "url("+responseJson.hdurl+")", "color": "white", "background-repeat": "no-repeat", "background-position":"center", "background-size": "cover"});
  $('.explanation').append(
    `${responseJson.explanation}`);
  $('input[type=text]').val("");
    $("body").css('background-image', 'none');
  $('.results').removeClass('hidden');
  $('#js-form, #js-error-message').addClass('hidden');
  $('h1').css("color", "black");
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


function removePage(responseJson){
  $('.removePage, h5, p.explanation').addClass('hidden');
  $('.newPage, p#content').removeClass('hidden');
  $('.flex-container > div:hover').css('transform', "scale(1.0)");
};

function resizePic(){
$('.box').css({"width":"700px", "height":"400px"})
}

function sendString(){
  let send=$(`
  <div class="send-to">
  <h4>Take a screenshot of the postcard and send it!</h4>
  <p>Mac - Command + shift + 4</p>
  <p>Windows - Alt + PrtScn</p> 
  <p>iphone - Press side and volume buttons, quickly release</p>
  <a href="mailto:name@email.com">Send</a>
  </div>`);
  return send;
}

function sendPage(){
  $('button').click(function(){
  $('.send-here').append(
    sendString()
    );
  $('select, textarea, button').addClass('hidden')
    })}


function seePicPage(){
  $('.box').click(function(){
    removePage();
    resizePic();
    sendPage();
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



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchDate = $('#js-search-date').val();
    getAPOD(searchDate);
    clickCount++;
    seePicPage();
    addStylingToText();
  });
}



$(watchForm);





