// Container for display details of selected phone 
const detailContainer = document.getElementById('display-detail');

// Function for Display Section title 
const showHide = (id, displayStyle) => {
    document.getElementById(id).style.display = displayStyle;
  };
showHide('search-heading', 'none');
showHide('detail-heading', 'none');
showHide('display-error', 'none');

// Declare Function for Spinner 
const spinner = (displayStyle) => {
    document.getElementById("spinner-border").style.display = displayStyle;
  };
spinner('none');

// Search Phone by Brand Name 
const searchPhone = () => {
    spinner('block');
    const searchValue = document.getElementById("search-field").value;
    const searchText = searchValue.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhones(data.data));
    //   Clear input field, detail container
    document.getElementById("search-field").value = "";
    detailContainer.innerHTML = '';
    detailContainer.classList.remove('display-detail');
    showHide('detail-heading', 'none');
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById("display-search"); 
    // Limit display upto 20
    if(phones.length <= 0){
        showHide('display-error', 'block');
        spinner('none');
        showHide('search-heading', 'none');
        showHide('detail-heading', 'none');
        detailContainer.innerHTML = '';
        detailContainer.classList.remove('display-detail');
        phonesContainer.textContent = ''; 
        phonesContainer.classList.remove('display-search') ;
    }else {        
        phonesContainer.classList.add('display-search') ;
        // Clear Display serach result    
        phonesContainer.textContent = '';   
        const phoneQunatity = phones.slice(0, 20);
        phoneQunatity.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h5 class="card-title">${phone.brand}</h5>
                    <button onclick="loadPhoneDetails('${phone.slug}')">Explore</button>
                </div>
            </div> 
        `;
        phonesContainer.appendChild(div);
      })
      spinner('none');
      // Display Section Title  and error
    showHide('search-heading', 'block');
    showHide('display-error', 'none');
    }
};

// Load Phone Detail by Phone ID  
const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhoneDetails(data.data));
      // Display Section Title  
    showHide('detail-heading', 'block');
}

// Display Phone Detail by using Explore button 
const displayPhoneDetails = (info) => {
    const sensorsInfo = info.mainFeatures.sensors;
    // Class added for adding style 
    detailContainer.classList.add('display-detail');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${info.name}</h4>
                <h5 class="card-title"><strong>Brand: ${info.brand}</strong></h5>
                <p class="card-text">${ info.releaseDate ? info.releaseDate : 'Release date not found!'} </p>
                <h5 class="card-title"><strong>Main Features:</strong></h5>
                <hr>
                <p class="card-text"><strong>Chipset:</strong> ${info.mainFeatures.chipSet}</p>
                <p class="card-text"><strong>Memory:</strong> ${info.mainFeatures.memory}</p>
                <p class="card-text"><strong>Storage:</strong> ${info.mainFeatures.storage}</p>
                <p class="card-text"><strong>Display Size:</strong> ${info.mainFeatures.displaySize}</p>  
                <h5 class="card-title"><strong>Sensors Information:</strong></h5>   
                <hr>            
                <p class="card-text"><strong> ${sensorsInfo.join(', ')}</strong></p>  
                <h5 class="card-title"><strong>Others Information:</strong></h5> 
                <hr>              
                <p class="card-text"><strong>WLAN: </strong> ${ info.others?.WLAN ? info.others?.WLAN : 'WLAN not found!'} </p>
                <p class="card-text"><strong>Bluetooth: </strong> ${ info.others?.Bluetooth ? info.others?.Bluetooth : 'Bluetooth not found!'} </p>
                <p class="card-text"><strong>GPS: </strong> ${ info.others?.GPS ? info.others?.GPS : 'GPS not found!'} </p>
                <p class="card-text"><strong>USB: </strong> ${ info.others?.USB ? info.others?.USB : 'USB not found!'} </p>
                <p class="card-text"><strong>Radio: </strong> ${ info.others?.Radio ? info.others?.Radio : 'Radio not found!'} </p>
            </div>
        </div> 
    `;
    detailContainer.appendChild(div);       
};





