function getToken(){
  const localstorage_user = JSON.parse(localStorage.getItem('user'))
  return  localstorage_user.token
}


async function beregnDagssum() {
  try {
    // Hent JSON-data asynkront fra URL
    const response = await   fetch('https://kohberg-backend.azurewebsites.net/data', {
      method: "GET",
      headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
      }
  })

    if (!response.ok) {
      throw new Error(`HTTP-fejl! Status: ${response.status}`);
    }

    const jsonData = await response.json();

    // Initialiser summen og ugeoptælleren
    let ugeSalgSums = new Array(48).fill(0);

    // Tjek om jsonData.data.data er et array før iteration
    if (
      jsonData.data &&
      jsonData.data.data &&
      jsonData.data.data.length &&
      Array.isArray(jsonData.data.data)
    ) {
      // Gennemløb alle elementer
      jsonData.data.data.forEach(element => {
        try {
          // Tilføj til salgStk-summene
          for (let i = 1; i <= 48; i++) {
            const salgStkKey = `salg_stk${i}`;
            ugeSalgSums[i - 1] += parseInt(element[salgStkKey]) || 0;
          }
        } catch (error) {
          console.error('Fejl i element:', error);
        }
      });
      
      // Beregn og udskriv summen pr. dag (runder op til nærmeste heltal)
      const dagssum = ugeSalgSums.map(sum => Math.ceil(sum / 7));

      return dagssum; // Returner dagssum
    } else {
      console.error('Fejl: Uventet format af JSON-data.');
      console.log('Uventet format:', jsonData);
      return []; // Returner et tomt array for at undgå udefineret værdi
    }
  } catch (error) {
    console.error('Fejl under indlæsning af JSON-fil:', error);
    return []; // Returner et tomt array for at undgå udefineret værdi
  }
}


async function beregnUgesum() {
  try {
      // Hent JSON-data asynkront fra URL
      const response = await   fetch('https://kohberg-backend.azurewebsites.net/data', {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })

      if (!response.ok) {
          throw new Error(`HTTP-fejl! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      // Initialiser summen og ugeoptælleren
      let ugeSalgSums = new Array(48).fill(0);

      // Tjek om jsonData.data.data er et array før iteration
      if (
          jsonData.data &&
          jsonData.data.data &&
          jsonData.data.data.length &&
          Array.isArray(jsonData.data.data)
      ) {
          // Gennemløb alle elementer
          jsonData.data.data.forEach(element => {
              try {
                  // Tilføj til salgStk-summene
                  for (let i = 1; i <= 48; i++) {
                      const salgStkKey = `salg_stk${i}`;
                      ugeSalgSums[i - 1] += parseInt(element[salgStkKey]) || 0;
                  }
              } catch (error) {
                  console.error('Fejl i element:', error);
              }
          });

          // Udskriv summen af ugerne
          const ugesum = ugeSalgSums.map(sum => sum);
          return ugesum;
      } else {
          console.error('Fejl: Uventet format af JSON-data.');
          console.log('Uventet format:', jsonData);
          return []; // Returner et tomt array for at undgå udefineret værdi
      }
  } catch (error) {
      console.error('Fejl under indlæsning af JSON-fil:', error);
      return []; // Returner et tomt array for at undgå udefineret værdi
  }
}

async function beregnMånedsum() {
  try {
    // Hent JSON-data asynkront fra URL
    const response = await   fetch('https://kohberg-backend.azurewebsites.net/data', {
      method: "GET",
      headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
      }
  })

    if (!response.ok) {
      throw new Error(`HTTP-fejl! Status: ${response.status}`);
    }

    const jsonData = await response.json();

    // Initialiser summen og ugeoptælleren
    let ugeSalgSums = new Array(48).fill(0);
    let månedSalgSums = new Array(12).fill(0);

    // Tjek om jsonData.data.data er et array før iteration
    if (
      jsonData.data &&
      jsonData.data.data &&
      jsonData.data.data.length &&
      Array.isArray(jsonData.data.data)
    ) {
      // Gennemløb alle elementer
      jsonData.data.data.forEach(element => {
        try {
          // Tilføj til salgStk- og ugesummene
          for (let i = 1; i <= 48; i++) {
            const salgStkKey = `salg_stk${i}`;
            ugeSalgSums[i - 1] += parseInt(element[salgStkKey]) || 0;

            // Check for hver 4 uger og tilføj til månedssummene
            if (i % 4 === 0) {
              const månedIndex = Math.floor(i / 4) - 1;
              månedSalgSums[månedIndex] += ugeSalgSums.reduce((acc, val) => acc + val, 0);
            }
          }
        } catch (error) {
          console.error('Fejl i element:', error);
        }
      });

      // Udskriv summen af månederne
      const månedsum = månedSalgSums.map(sum => sum);
      return månedsum;
    } else {
      console.error('Fejl: Uventet format af JSON-data.');
      console.log('Uventet format:', jsonData);
      return []; // Returner et tomt array for at undgå udefineret værdi
    }
  } catch (error) {
    console.error('Fejl under indlæsning af JSON-fil:', error);
    return []; // Returner et tomt array for at undgå udefineret værdi
  }
}

async function beregnÅrssum(årssumArray) {
  try {
    // Tjek om årssumArray er et array før iteration
    if (Array.isArray(årssumArray) && årssumArray.length > 0) {
      // Beregn og returner den akkumulerede sum af alle måneder
      return årssumArray.reduce((acc, val) => acc + val, 0);
    } else {
      console.warn('Advarsel: ÅrssumArray er tomt eller udefineret. Returnerer 0.');
      return 0; // Returner 0 for at undgå udefineret værdi
    }
  } catch (error) {
    console.error('Fejl under beregning af årssum:', error);
    return 0; // Returner 0 for at undgå udefineret værdi
  }
}

// Eksempel på brug med årsarray
let årssumArray = [];

let dayTotal, weekTotal, monthTotal;



// Lav et array af promises for hver beregning
const promises = [
  beregnDagssum(),
  beregnUgesum(),
  beregnMånedsum()
];

// Funktion til at opdatere HTML-element med værdi og tilføje "STK."
function updateHtmlElement(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    // Opdater HTML-elementet med den rå strengværdi plus " STK."
    element.innerText = value !== undefined && value !== null ? `${value} Stk.` : 'N/A';
  }
}

// Funktion til at opdatere tekstetiketten baseret på id
function updateLabelFromId(elementId) {
  // Få fat i tekstetiketten baseret på id
  const label = document.querySelector(`#${elementId} + div p`);
  if (label) {
    // Opdater tekstetiketten med værdien af id (fjern "Total" og tilføj "STK.")
    label.innerText = `${elementId.replace("Total", "")} STK.`;
  }
}

// Vent på, at alle promises er færdige
Promise.all(promises)
  .then(results => {
    // Hent resultaterne fra promises
    const [dagssum, ugesum, månedsum] = results;

    // Tilføj resultaterne til årssumArray
    årssumArray = årssumArray.concat(dagssum, ugesum, månedsum);
    // Opdater HTML-elementerne
    updateHtmlElement('todayTotal', formatNumber(dagssum[dagssum.length - 1]));
    updateHtmlElement('weekTotal', formatNumber(ugesum[ugesum.length - 1]));
    updateHtmlElement('monthTotal', formatNumber(månedsum[månedsum.length - 1]));
    updateHtmlElement('totalSale', formatNumber(årssumArray[årssumArray.length - 1])); // Brug den sidste værdi i årssumArray som total salg

    // Opdater årssummen ved at kalde beregnÅrssum
    return beregnÅrssum(årssumArray);
  })
  .then(årssum => {
    // Opdater HTML-elementet med årssummen
    updateHtmlElement('totalSale', formatNumber(årssum));
  })
  .catch(error => console.error('Fejl ved beregning af årssum:', error));

// Kald funktionen for hvert id
updateLabelFromId("todayTotal");
updateLabelFromId("weekTotal");
updateLabelFromId("monthTotal");
updateLabelFromId("totalSale");

// Funktion til at formatere et tal med punktum som tusindtalsseparator
function formatNumber(number) {
  return number.toLocaleString('da-DK', { useGrouping: true });
}


  const apiToken = 'dzagui0hq3z80kyf1jr40l10apxdweuiybq6zko4';
  const apiEndpoint = 'https://api.json-generator.com/templates/s5vsN1doCVHK/data';

  // Fetch sales data from the API
async function fetchSalesData() {
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sales data: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data.sales;
    } catch (error) {
      console.error('Error fetching sales data:', error.message);
      throw error;
    }
  }

    // Function to fetch data from the API and update the table
    async function updateRecentSalesTable() {
      try {
        const salesData = await fetchSalesData();
        // Call a function to update the table with the received data
        populateTable(salesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  // Function to populate the HTML table with data
  function populateTable(data) {
    const tableBody = document.querySelector('#recent-sales-table tbody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Function to format date as "DD MMM YYYY"
    const formatDate = (inputDate) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(inputDate).toLocaleDateString('en-US', options);
    };

    // Loop through the data and create a row for each entry
    data.forEach((sale, index) => {
      // Generate a unique invoice code (you can customize this logic)
      const invoiceCode = `INV-${index + 1}`;

      // Assuming status and action are hardcoded
      const status = 'Paid';
      const action = '<a class="btn btn-sm btn-primary" href="">Detail</a>';

      const row = document.createElement('tr');
      row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${formatDate(sale.date)}</td>
              <td>${invoiceCode}</td>
              <td>${sale.customer}</td>
              <td>${sale.amountDKK}</td>
              <td>${status}</td>
              <td>${action}</td>
          `;

      tableBody.appendChild(row);
    });
  }



  // Call the function to initially populate the table
  updateRecentSalesTable();