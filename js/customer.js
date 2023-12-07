async function createCustomer() {
  try {
    const customerForm = document.getElementById('customerForm');
    const formData = new FormData(customerForm);

    const res = await fetch('/api/customer/create', {
      method: 'POST',
      body: formData,
    });

    if (res.status >= 400) {
      const error = await res.json();
      throw new Error(`Error ${res.status}: ${error.message}`);
    }

    const body = await res.json();
    console.log('Customer created:', body);
    skjulOpretKundeForm();
  } catch (err) {
    console.error('Error creating customer:', err.message);
  }
};

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
  var addCustomerLink = document.getElementById('addCustomerLink');
  if (addCustomerLink) {
      addCustomerLink.addEventListener('click', function () {
          console.log('Add customer link clicked');
          visOpretKundeForm();
      });
  }


});
