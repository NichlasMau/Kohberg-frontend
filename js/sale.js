async function beregnDagssum(jsonFilSti) {
  try {
    // Hent JSON-data asynkront fra URL
    const response = await fetch(jsonFilSti);

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


async function beregnUgesum(jsonFilSti) {
  try {
      // Hent JSON-data asynkront fra URL
      const response = await fetch(jsonFilSti);

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

async function beregnMånedsum(jsonFilSti) {
  try {
    // Hent JSON-data asynkront fra URL
    const response = await fetch(jsonFilSti);

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

// Eksempel på brug med URL'en
const jsonFilSti = 'http://localhost:8080/data';
// Eksempel på brug med årsarray
let årssumArray = [];

let dayTotal, weekTotal, monthTotal;



// Lav et array af promises for hver beregning
const promises = [
  beregnDagssum(jsonFilSti),
  beregnUgesum(jsonFilSti),
  beregnMånedsum(jsonFilSti)
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

/// Vent på, at alle promises er færdige
Promise.all(promises)
.then(results => {
  // Hent resultaterne fra promises
  const [dagssum, ugesum, månedsum] = results;

  // Tilføj resultaterne til årssumArray
  årssumArray = årssumArray.concat(dagssum, ugesum, månedsum);
  // Opdater HTML-elementerne
  updateHtmlElement('todayTotal', dagssum[dagssum.length - 1]);
  updateHtmlElement('weekTotal', ugesum[ugesum.length - 1]);
  updateHtmlElement('monthTotal', månedsum[månedsum.length - 1]);
  updateHtmlElement('totalSale', årssumArray[årssumArray.length - 1]); // Brug den sidste værdi i årssumArray som total salg

   // Opdater årssummen ved at kalde beregnÅrssum
   return beregnÅrssum(årssumArray);
  })
  .then(årssum => {
    // Opdater HTML-elementet med årssummen
    updateHtmlElement('totalSale', årssum);
  })
  .catch(error => console.error('Fejl ved beregning af årssum:', error));


  
  // Kald funktionen for hvert id
  updateLabelFromId("todayTotal");
  updateLabelFromId("weekTotal");
  updateLabelFromId("monthTotal");
  updateLabelFromId("totalSale");

