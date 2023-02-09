
// 1. Dinamicly add HTML content to the main gallery:

// 2. Arranging CSS (in styles.css file):

// 3. Get and display 12 random users from The Random User Generator API:

// a. Fetch data from random employee API:
fetch('https://randomuser.me/api/')
    .then( response => response.json() )
    .then( data => getData(data.results[0]) )

// b. Function to handle data from API:
function getData(data) {
    const html = `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${data.picture.thumbnail}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
    </div>
</div>
    `;
    document.getElementById('gallery').innerHTML = html;
}


// 4. Create a modal window:





// ---------------------------------------  Extra Credit --------------------------- //

// 1. Programm search bar element:

// 2. Programm modal toggle:

// 3. Structure, style and CSS: