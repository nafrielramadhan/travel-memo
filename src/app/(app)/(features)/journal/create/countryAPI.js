// konfigurasi API
var config = {
  cUrl: "https://api.countrystatecity.in/v1/countries",
  ckey: "RGoxckpSOE1YNUx3d0NMTk9JTVl5MUJxUzhjU1c2M1RLbUJvOGZ1ag==",
};

var countrySelect = document.querySelector(".country"),
  //   stateSelect = document.querySelector(".state"), Kita gapake state
  citySelect = document.querySelector(".city");

function loadCountries() {
  let apiEndPoint = config.cUrl;

  fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
    .then((Response) => Response.json())
    .then((data) => {
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.iso2;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading countries:", error));

  citySelect.disabled = true;
  citySelect.style.pointerEvents = "none";
}

function loadCities() {
  citySelect.disabled = false;
  citySelect.style.pointerEvents = "auto";

  const selectedCountryCode = countrySelect.value;
  citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/cities`, {
    headers: { "X-CSCAPI-KEY": config.ckey },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((state) => {
        const option = document.createElement("option");
        option.value = city.iso2;
        option.textContent = city.name;
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading cities:", error));
}

window.onload = loadCountries;

// function loadCities() {
//   citySelect.disabled = false;
//   citySelect.style.pointerEvents = "auto";

//   const selectedCountryCode = countrySelect.value;
//   const selectedStateCode = stateSelect.value;
//   // console.log(selectedCountryCode, selectedStateCode);

//   citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

//   fetch(
//     `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
//     { headers: { "X-CSCAPI-KEY": config.ckey } }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // console.log(data);

//       data.forEach((city) => {
//         const option = document.createElement("option");
//         option.value = city.iso2;
//         option.textContent = city.name;
//         citySelect.appendChild(option);
//       });
//     });
// }
