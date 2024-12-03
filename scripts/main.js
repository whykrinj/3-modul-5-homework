let data = null;
let loading = false;

const loadingElement = document.querySelector("#loading");
const countriesListElement = document.querySelector("#countries-list");
const searchInputElement = document.querySelector("#search-input");

function checkload() {
    if (loading) {
        loadingElement.classList.remove('hidden');
        countriesListElement.classList.add('hidden');
    } else {
        loadingElement.classList.add('hidden');
        countriesListElement.classList.remove('hidden');
    }
}
checkload();

async function fetchCountries() {
    loading = true;
    checkload();
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        data = await response.json();
        displayCountries(data);
    } catch (error) {
        console.error('Error fetching countries:', error);
    } finally {
        loading = false;
        checkload();
    }
}

fetchCountries();

function displayCountries(countries) {
    countriesListElement.innerHTML = "";
    countries.forEach((country) => {
        const countryElement = document.createElement("div");
        countryElement.className = "min-w-[240px] rounded-lg overflow-hidden flex-1 bg-[#2b2844] shadow-xl text-white";
        countryElement.innerHTML = `
        <figure><img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="h-48 w-full object-cover"/></figure>
        <div class="card body">
            <h2 class="card-title text-lg">${country.name.common}</h2>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
            <p>Region: ${country.region}</p>
        </div>
        `;

        countriesListElement.appendChild(countryElement);
    });
}

searchInputElement.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCountries = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
});
