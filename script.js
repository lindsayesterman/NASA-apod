'use strict';

const apiKey = 'r3jILMQZkXic56riXzLfUPJTt2gZIzarkItsVxyp'; 

const searchURL = 'https://api.nasa.gov/planetary/apod';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the data array
    // for each object in the data
    //array, add a list item to the results 
    //list with the NP full name, description,
    //and URL
    $('#results-list').append(

      `<div class="container"><ul><li><h3>${responseJson.title}</h3></li>
      <li><img src="${responseJson.hdurl}"></li>
      <li><p>${responseJson.explanation}</p></li>
      </ul></div>`
    );
  //display the results section  
  $('#results').removeClass('hidden');
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



