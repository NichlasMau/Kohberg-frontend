// Replace 'YOUR_API_TOKEN' with your actual API token
const apiToken = 'dzagui0hq3z80kyf1jr40l10apxdweuiybq6zko4';

// Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
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

  function updateSalesUI(dailySales, weeklySales, monthlySales) {
    // Hent dagens dato
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  
    // Opdater daglig total i kr
    const dailyTotal = dailySales
      .filter((daySales) => daySales.date === todayFormatted)
      .reduce((acc, daySales) => acc + daySales.amountDKK, 0);
  
    document.getElementById('todayTotal').innerText = `${dailyTotal} KR.`;
  
    // Hent den aktuelle uge
    const currentWeek = today.getWeek();
  
    // Opdater ugentlig total i kr
    const weeklyTotal = weeklySales
      .flat()
      .filter((daySales) => {
        const dayDate = new Date(daySales.date);
        return dayDate.getWeek() === currentWeek;
      })
      .reduce((acc, daySales) => acc + daySales.amountDKK, 0);
  
    document.getElementById('weekTotal').innerText = `${weeklyTotal} KR.`;
  
    // Opdater månedlig total i kr
    const monthlyTotal = monthlySales
      .reduce((acc, month) => acc + month.reduce((acc, daySales) => acc + daySales.amountDKK, 0), 0);
  
    document.getElementById('monthTotal').innerText = `${monthlyTotal} KR.`;
  
    // Opdater totalt salg antal stk
    const totalSale = dailySales.length;
    document.getElementById('totalSale').innerText = `${totalSale} STK.`;
  
    console.log('Updated UI with:', dailyTotal, weeklyTotal, monthlyTotal, totalSale);
  }
  
  // Funktion til at hente ugenummer for en given dato
  Date.prototype.getWeek = function () {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };
  

    // Function to handle errors during the update
    function handleUpdateError(error) {
    // You can customize error handling based on your requirements
    console.error('Error updating sales UI:', error.message);
    }

    // Function to update sales data
    async function updateSales() {
    try {
    const salesData = await fetchSalesData();
  
    const dailySales = salesData;
    const weeklySales = chunkArray(dailySales, 7);
    const monthlySales = chunkArray(dailySales, 30);
    console.log('Daily Sales:', dailySales);
    console.log('Weekly Sales:', weeklySales);
    console.log('Monthly Sales:', monthlySales);

  
        updateSalesUI(dailySales, weeklySales, monthlySales);
    } catch (error) {
        handleUpdateError(error);
    }
  }
  
  // Function to chunk an array into smaller arrays
    function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
// Trigger the update when the DOM is loaded
document.addEventListener('DOMContentLoaded', updateSales);

// Function to fetch data from the API and update the table
async function updateRecentSalesTable() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        // Call a function to update the table with the received data
        populateTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

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
  
  // Trigger the update when the DOM is loaded
document.addEventListener('DOMContentLoaded', updateSales);



// Trigger the update when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateRecentSalesTable();
});