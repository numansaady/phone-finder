// Search Phone by Brand Name 
const searchPhone = () => {
    const searchValue = document.getElementById("search-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhones(data.data));
    document.getElementById("search-field").value = "";
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById("display-search");
    const phoneQunatity = phones.slice(0, 20);
    for (const phone of phoneQunatity) {
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
        phonesContainer.appendChild(div)
      }
};

const loadPhoneDetails = (phoneId) => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (info) => {
    console.log(info.others)
    const sensorsInfo = info.mainFeatures.sensors
    const detailContainer = document.getElementById('display-detail')
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${info.name}</h4>
                <h5 class="card-title">${info.brand}</h5>
                <p class="card-text">${ info.releaseDate ? info.releaseDate : 'Release date not found!'} </p>
                <h5 class="card-title">Main Features:</h5>
                <hr>
                <p class="card-text"><strong>Chipset:</strong> ${info.mainFeatures.chipSet}</p>
                <p class="card-text"><strong>Memory:</strong> ${info.mainFeatures.memory}</p>
                <p class="card-text"><strong>Storage:</strong> ${info.mainFeatures.storage}</p>
                <p class="card-text"><strong>Display Size:</strong> ${info.mainFeatures.displaySize}</p>  
                <h5 class="card-title">Sensors Information:</h5>   
                <hr>            
                <p class="card-text"><strong> ${sensorsInfo.join(', ')}</strong></p>  
                <h5 class="card-title">Others Information:</h5> 
                <hr>              
                <p class="card-text">${ info.others?.WLAN ? info.others?.WLAN : 'WLAN not found!'} </p>
                <p class="card-text">${ info.others?.Bluetooth ? info.others?.Bluetooth : 'Bluetooth not found!'} </p>
                <p class="card-text">${ info.others?.GPS ? info.others?.GPS : 'GPS not found!'} </p>
                <p class="card-text">${ info.others?.USB ? info.others?.USB : 'USB not found!'} </p>
                <p class="card-text">${ info.others?.Radio ? info.others?.Radio : 'Radio not found!'} </p>
            </div>
        </div> 
    `;
    detailContainer.appendChild(div);
}


