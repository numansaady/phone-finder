// Search Phone by Brand Name 
const searchPhone = () => {
    const searchValue = document.getElementById("search-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data.data));
    document.getElementById("search-field").value = "";
}



