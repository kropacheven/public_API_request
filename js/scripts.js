// Global variables: 
const gallery = document.getElementById('gallery');
let employees = [];





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
    employees = data;
    console.log(employees);
    for (let i = 0; i < data.length; i++ ) {
    const html = `
    <div class="card" data-index=${i}>
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
    gallery.insertAdjacentHTML('beforeend', html );
    }
}


// 2. Create a modal window for chosen employee:

// a. Function for modal view:
function displayModal(index) {
    //object destructuring for cleaner code:
    let {dob, email, location, name, phone, picture} = employees[index];
    const modalHTML = 
    `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.date}</p>
            </div>
        </div>
    </div>
    `;
    gallery.insertAdjacentHTML('afterend', modalHTML);
    //Code block for closing modal window functionality:
    const modalClose = document.querySelector('.modal-close-btn');
    modalClose.addEventListener('click', () => {
        modalClose.parentElement.parentElement.remove();
    });
}

// b. Event listener for modal view display:
gallery.addEventListener('click', (event) => {
    if (event.target !== gallery) {
       // selecting the card element based on its proximity to actual element that is clicked
       const card =  event.target.closest('.card');
       // capturing the index of the card of the clicked element
       const index = card.getAttribute('data-index');
       //console.log(card);
       //console.log(index);
       displayModal(index);
    }
});

console.log(employees);
// ---------------------------------------  Extra Credit --------------------------- //

// 1. Programm search bar element:

// 2. Programm modal toggle:
