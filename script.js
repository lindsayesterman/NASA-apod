
'use strict';

const apiKey = 'r3jILMQZkXic56riXzLfUPJTt2gZIzarkItsVxyp'; 

const searchURL = 'https://api.nasa.gov/planetary/apod';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  console.log(responseJson);

$('input[type=text]').val("");
$('ul > .flex-container > li > div').replaceWith(
      `<ul>
      <li><div class="imgAppended"><a href="template.html"><img src="${responseJson.hdurl}"></a></div></li>
    </ul>`
    );
};


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
  });
}

$(watchForm);

