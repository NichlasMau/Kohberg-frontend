
async function createCustomer() {
    try {
      const customerForm = document.getElementById('customerForm');
      const formData = new FormData(customerForm);
  
      const res = await fetch('/api/customer/create', {
        method: 'POST',
        body: formData,
      });
  
      if (res.status >= 400) {
        const error = new Error(`Error ${res.status} ${res.statusText}`);
        throw error;
      }
  
      const body = await res.json();
      console.log('Kunde oprettet:', body);
      skjulOpretKundeForm();
    } catch (err) {
      console.error(err.message);
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addCustomerLink').addEventListener('click', function () {
      console.log('Add customer link clicked');
      visOpretKundeForm();
    });
  
    document.getElementById('submitCustomerForm').addEventListener('click', function (event) {
      event.preventDefault(); // Forhindrer formen i at blive indsendt på traditionel måde
      createCustomer();
    });

  

    // Your logic for creating a customer in the database goes here
    // For example, you might use a database ORM like Mongoose for MongoDB
    res.json({ message: 'Customer created successfully' });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Funktion for at vise opret kunde formular
 function visOpretKundeForm() {
  const modal = document.getElementById('opretKundeModal');
  modal.style.display = 'block';
}

// Funktion for at skjule opret kunde formular
 function skjulOpretKundeForm() {
  const modal = document.getElementById('opretKundeModal');
  modal.style.display = 'none';
}

 function opretKunde() {
  const customerForm = document.getElementById('customerForm');
  const formData = new FormData(customerForm);

  fetch('/api/customer/create', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Kunde oprettet:', data);
      skjulOpretKundeForm();
    })
    .catch(error => {
      console.error('Fejl ved oprettelse af kunde:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('addCustomerLink').addEventListener('click', function () {
    console.log('Add customer link clicked');
    visOpretKundeForm();
  });
});
