
// 1. Get and display 12 random users from The Random User Generator API:

// a. Fetch data from random employee external API:
fetch('https://randomuser.me/api/?results=12')
    .then( response => response.json() )
    .then( data => getData(data.results) )


/**
 * b. Function to handle data from external API.
 *
 * @param {array} data - An array of objects that will be fetched from external API
 * @return Injects necessary information from array into predefinedHTML template
 */
function getData(data) {
    for (let i = 0; i < data.length; i++ ) {
    const html = `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${data[i].picture.thumbnail}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
        <p class="card-text">${data[i].email}</p>
        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
    </div>
</div>
    `;
    // Dinamicly add HTML content to the main gallery:
    document.getElementById('gallery').insertAdjacentHTML('beforeend', html );
    }
}


// 2. Create a modal window for chosen employee:

// a. Function for modal view:

// b. Event listener for modal view display:



// ---------------------------------------  Extra Credit --------------------------- //

// 1. Programm search bar element:

// 2. Programm modal toggle:
