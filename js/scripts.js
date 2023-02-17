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

/**
 * a. Function for displaying modal view window on the screen as overlay.
 *
 * @param {number} index - A number (index of employee card)
 * @return Injects necessary information into modal window from API request object (chosen by index)
 */
function displayModal(index) {
    //object destructuring for cleaner code:
    let {cell, dob, email, location, name, picture} = employees[index];
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
                <p class="modal-text">${cell.replace(/^\D*?(\d{1})\D*?(\d{1})\D*?(\d{1})\D*?(\d{1})\D*?(\d{1})\D*?(\d{1})\D*?(\d{1})\D*?(\d{1}|)\D*?(\d{1}|)\D*?(\d{1}|)\D*(\d{1}|)\D*$/, '($1$2$3) $4$5$6-$7$8$9$10$11')}</p>
                <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.date.replace(/(\d{4})-(\d{2})-(\d{2}).+/, '$2/$3/$1')}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    gallery.insertAdjacentHTML('afterend', modalHTML);
    //a.1 Code block for closing modal window functionality:
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
       let index = card.getAttribute('data-index');
       //console.log(card);
       //console.log(typeof index);
       //console.log(index)
       displayModal(index);
       let modalIndex = parseInt(index);
    // b.1 Event listeners for switching/toggling back and forth on modal window:
       document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains("modal-prev")) {
            //console.log(event.target);
            if (modalIndex !== 0) {
            modalIndex--;
            console.log(modalIndex);
            event.target.parentElement.parentElement.remove();
            displayModal(modalIndex);
            } else {
               modalIndex = 11;
               event.target.parentElement.parentElement.remove();
               displayModal(modalIndex);
            }
        }
        });
        document.body.addEventListener('click', (event) => {
            if (event.target.classList.contains("modal-next")) {
            //console.log(event.target);
            if (modalIndex !== employees.length-1) {
                modalIndex++;
                console.log(modalIndex);
                event.target.parentElement.parentElement.remove();
                displayModal(modalIndex);
                } else {
                    modalIndex = 0;
                    event.target.parentElement.parentElement.remove();
                    displayModal(modalIndex);
                }
            }
        });   
    }
});




// ---------------------------------------  Extra Credit --------------------------- //

// 1. Program search bar element:

// a. Capturing and inserting searchbar on the page:
const searchBar = document.querySelector('.search-container');
const searchHTML = 
`
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;
searchBar.insertAdjacentHTML('beforeend', searchHTML);

// b. Search function:
function searchFilter(event) {
    // Capturing elements to compare:
    let searchName = event.target.value.toLowerCase();
    let employeeName = document.querySelectorAll('.card-name');
    // Iterating over employee names with search:
    employeeName.forEach(employeeName => {
        let name = employeeName.textContent.toLowerCase();
        let cardOfEmployee = employeeName.parentElement.parentElement;

        if (name.includes(searchName)) {
            cardOfEmployee.style.display = '';
        } else {
            cardOfEmployee.style.display = 'none';
        }
    });
}

// c. Adding event listener functionality to the searchbar:
searchBar.addEventListener('input', searchFilter);


// 2. Program modal toggle back and forth by using 'Prev' and 'Next' buttons:
// ^^^Put into displayModal block in upper main section of the file^^^