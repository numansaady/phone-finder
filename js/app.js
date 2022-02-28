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
    for (const phone of phones) {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h5 class="card-title">${phone.brand}</h5>
                    <button onclick="loadDetails('${phone.slug}')">Explore</button>
                </div>
            </div> 
        `;
        phonesContainer.appendChild(div)
      }
};



