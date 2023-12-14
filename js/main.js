
  document.addEventListener('DOMContentLoaded', (event) => {
    getAllReminders();
});

async function getAllReminders() {

function getToken(){
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    return  localstorage_user.token
  }
  

    const response = await fetch(`https://kohberg-backend.azurewebsites.net/reminder/all`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const reminders = await response.json();

    const remindersDropdown = document.getElementById('remindersDropdown');
    remindersDropdown.innerHTML = '';  // Clear existing content

    reminders.forEach((reminder, index) => {
        const reminderElement = document.createElement('a');
        reminderElement.href = '#';
        reminderElement.classList.add('dropdown-item');
        reminderElement.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="ms-2">
                    <h6 class="fw-normal mb-0">Message: ${reminder.message}</h6>
                    <small>Date: ${reminder.formattedReminderDate}</small>
                </div>
            </div>
        `;
        remindersDropdown.appendChild(reminderElement);

        // Add a divider, but not after the last item
        if (index < reminders.length - 1) {
            const divider = document.createElement('hr');
            divider.classList.add('dropdown-divider');
            remindersDropdown.appendChild(divider);
        }
    });

    // Add "See all reminders" link at the bottom
    const seeAllReminders = document.createElement('a');
    seeAllReminders.href = '/reminder.html';
    seeAllReminders.classList.add('dropdown-item', 'text-center');
    seeAllReminders.textContent = 'See all reminders';
    remindersDropdown.appendChild(seeAllReminders);
}



(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";

 // Token and API fetch
const apiToken = 'dzagui0hq3z80kyf1jr40l10apxdweuiybq6zko4';
const apiEndpoint = 'https://api.json-generator.com/templates/s5vsN1doCVHK/data';

 fetch(apiEndpoint, {
     headers: {
         Authorization: `Bearer ${apiToken}`,
     },
 })
     .then(response => response.json())
     .then(data => {
         updateChartsWithData(data);
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });

 function updateChartsWithData(data) {
     updateWorldwideSalesChart(data);
     updateSalesRevenueChart(data);
     // Add other chart updates if needed
 }

// Function to update the Worldwide Sales Chart
function updateWorldwideSalesChart(data) {
  var ctx1 = $("#worldwide-sales").get(0).getContext("2d");

  // Assuming 'data' contains sales information in the expected format
  var monthlySalesSjælland = calculateMonthlyTotal(data, "Sjælland");
  var monthlySalesFyn = calculateMonthlyTotal(data, "Fyn");
  var monthlySalesJylland = calculateMonthlyTotal(data, "Jylland");

  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sjælland",
          data: monthlySalesSjælland,
          backgroundColor: "rgba(207, 183, 149, .7)",
        },
        {
          label: "Fyn",
          data: monthlySalesFyn,
          backgroundColor: "rgba(207, 183, 149, .5)",
        },
        {
          label: "Jylland",
          data: monthlySalesJylland,
          backgroundColor: "rgba(207, 183, 149, .3)",
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}


// Function to update the Sales & Revenue Chart for all regions combined
function updateSalesRevenueChart(data) {
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
  
    // Extracting sales and revenue data for all regions
    const allRegionsData = data.sales;

    // Calculate the total sales for all regions for each month
    const totalSales = calculateTotalSalesForAllRegions(data);
  
    // Extracting sales and revenue values for all regions
    const allRegionsRevenue = totalSales.map(total => total * 1.5); // Example: assuming revenue is 1.5 times the sales amount
  
    // Log the extracted data to the console
    console.log('All Regions Data:', allRegionsData);
    console.log('All Regions Sales:', totalSales);
    console.log('All Regions Revenue:', allRegionsRevenue);

    var myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "All Regions Sales",
            data: totalSales,
            backgroundColor: "rgba(207, 183, 149, .7)",
            borderColor: "rgba(207, 183, 149)",
            fill: true,
          },
          {
            label: "All Regions Revenue",
            data: allRegionsRevenue,
            backgroundColor: "rgba(207, 183, 149, .5)",
            borderColor: "rgba(207, 183, 149)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
}

// Function to calculate the total sales for all regions for each month
function calculateTotalSalesForAllRegions(data) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
        // Filter sales data for the given month
        var filteredData = data.sales.filter(sale => {
            var saleDate = new Date(sale.date);
            return saleDate.getMonth() + 1 === month;
        });

        // Calculate the total sales for the given month
        var monthlyTotal = filteredData.reduce((total, sale) => total + sale.amountDKK, 0);

        return monthlyTotal;
    });
}


// Funktion til at beregne den månedlige total for en specifik region
function calculateMonthlyTotal(data, region) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
      // Filtrer salgsdata for den givne region og måned
      var filteredData = data.sales.filter(sale => {
        var saleDate = new Date(sale.date);
        return sale.region === region && saleDate.getMonth() + 1 === month;
      });
  
      console.log(`Month: ${month}, Region: ${region}, Data:`, filteredData);
  
      // Beregn den samlede mængde for den givne måned og region
      var monthlyTotal = filteredData.reduce((total, sale) => total + sale.amountDKK, 0);
  
      return monthlyTotal;
    });
  }

  
 
  
   
    /*// Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                    label: "Sales",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(207, 183, 149, .7)",
                    borderColor: "rgba(207, 183, 149)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(207, 183, 149, .5)",
                    borderColor: "rgba(207, 183, 149)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });
    


    // Single Line Chart
    var ctx3 = $("#line-chart")[0].getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Sales",

                fill: false,

                borderColor: "rgba(207, 183, 149)",
                fill: true,

                backgroundColor: "rgba(207, 183, 149, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });*/


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(207, 183, 149, .7)",
                    "rgba(207, 183, 149, .6)",
                    "rgba(207, 183, 149, .5)",
                    "rgba(207, 183, 149, .4)",
                    "rgba(207, 183, 149, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(207, 183, 149, .7)",
                    "rgba(207, 183, 149, .6)",
                    "rgba(207, 183, 149, .5)",
                    "rgba(207, 183, 149, .4)",
                    "rgba(207, 183, 149, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(207, 183, 149, .7)",
                    "rgba(207, 183, 149, .6)",
                    "rgba(207, 183, 149, .5)",
                    "rgba(207, 183, 149, .4)",
                    "rgba(207, 183, 149, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    
})(jQuery);

