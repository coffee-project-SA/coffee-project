"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee card" style="width: 300px;">';
    if (coffee.roast === 'light') {
        html += '<img class="coffee-image card-img-top" width="300px" height="300px" src="img_video/light-roast.png">'
        html += '<div class="col s6 roast-out card-body"><h3 class="coffee-name text">' + coffee.name;
        html += '<small class="coffee-roast">' + coffee.roast + '</small></h3>' + '</div>';
    } else if (coffee.roast === 'medium') {
        html += '<img class="coffee-image card-img-top" width="300px" height="300px" src="img_video/med-roast.png">'
        html += '<div class="col s6 roast-out"><h3 class="coffee-name text">' + coffee.name;
        html += '<small class="coffee-roast">' + coffee.roast + '</small></h3>' + '</div>';
    } else if (coffee.roast === 'dark') {
        html += '<img class="coffee-image card-img-top" width="300px" height="300px" src="img_video/dark-roast.png">'
        html += '<div class="col s6 roast-out"><h3 class="coffee-name text">' + coffee.name;
        html += '<small class="coffee-roast">' + coffee.roast + '</small></h3>' + '</div>';
    }

    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// by taking off e it allows us to use select menu and the input
function updateCoffees() {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var selectedName = nameInput.value;
    var filteredCoffees = [];
    JSON.parse(window.localStorage.getItem('customCoffees'));
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast || "all" === selectedRoast) {
            if (coffee.name.toLowerCase().includes(selectedName.toLowerCase())) {
                filteredCoffees.push(coffee);
            } else if ("" === selectedName) {
                filteredCoffees.push(coffee);
            }
        }
    });

    divCoffee.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
if (localStorage.getItem('customCoffees')=== null) {
    var coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];
    coffees.reverse();
} else {
    var coffees = JSON.parse(window.localStorage.getItem('customCoffees'));
    coffees.reverse();
}

var divCoffee = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit-1');
var submitButton2 = document.querySelector('#submit-2');
var roastSelection = document.querySelector('#roast-selection-1');
var nameInput = document.querySelector('#name-input')
var nameInput2 = document.querySelector("#name-input-2")
var roastSelection2 = document.querySelector('#roast-selection-2');


divCoffee.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

function autofillCoffee() {
    nameInput = document.querySelector('#name-input');
    updateCoffees();
}

function changeRoast() {
    roastSelection = document.querySelector('#roast-selection-1');
    updateCoffees();
}



submitButton2.addEventListener('click', updateUserCoffee);


function updateUserCoffee (event) {
    event.preventDefault();
    var newCoffee = {
        id: coffees.length + 1,
        name: nameInput2.value,
        roast: roastSelection2.value
    }

    coffees.push(newCoffee);
    console.log(coffees);
    localStorage.setItem('customCoffees', JSON.stringify(coffees));
    divCoffee.innerHTML = renderCoffees(coffees);
}

function resetLocal () {
    var asure = confirm("Are you sure you want to reset the list of coffees?");
    if (asure) {
        localStorage.removeItem('customCoffees');
        coffees = Array.from(coffees);
        window.location.reload();
        updateCoffees();
    }
}

var deleteCustomCoffee = document.getElementById("delete-btn");
deleteCustomCoffee.addEventListener('click', resetLocal);