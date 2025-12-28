const currentYear = document.querySelector('footer span');
const year = new Date().getFullYear();
currentYear.textContent = year;




    async function loadData() {
  const response = await fetch("/groupedData.json"); // load JSON file
  const groupedData = await response.json();

  const countryDatalist = document.getElementById("countries");
  Object.keys(groupedData).forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    countryDatalist.appendChild(option);
  });

  const countryInput = document.getElementById("country");
  const cityDatalist = document.getElementById("cities");

  countryInput.addEventListener("input", () => {
    const selectedCountry = countryInput.value;
    cityDatalist.innerHTML = "";
    if (groupedData[selectedCountry]) {
      groupedData[selectedCountry].forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        cityDatalist.appendChild(option);
      });
    }
  });
}

loadData();
   