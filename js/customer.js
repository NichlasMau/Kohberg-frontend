class YourClassName {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

 
  async createCustomer() {
    try {
      const customerForm = document.getElementById('customerForm');
      const formData = new FormData(customerForm);
  
      // Hent fødselsdag fra formdata
      const birthday = formData.get('birthday');
      // Split og vend om på datoformatet
      const formattedBirthday = birthday.split('-').reverse().join('-');
      // Split og vend om igen for at få ønsket format
      const finalFormattedBirthday = formattedBirthday.split('-').reverse().join('-');
  
      console.log('Creating customer with the following data:');
      console.log('Name:', formData.get('name'));
      console.log('Role:', formData.get('role'));
      console.log('Birthday:', finalFormattedBirthday);
      console.log('Email:', formData.get('email'));
  
      const requestBody = JSON.stringify({
        name: formData.get('name'),
        role: formData.get('role'),
        birthday: finalFormattedBirthday,
        email: formData.get('email'),
      });
  
      console.log('Request Body:', requestBody);
  
      const res = await fetch(`${this.apiBaseUrl}/customer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (res.status >= 400) {
        const error = await res.json();
        throw new Error(`Error ${res.status}: ${error.message}`);
      }
  
      const responseBody = await res.json();
      console.log('Customer created:', responseBody);
      this.hideCreateCustomerForm();
    }catch (err) {
        console.error('Error creating customer:', err.message);
        console.log('Request data:', {
          name: formData.get('name'),
          role: formData.get('role'),
          birthday: formattedBirthday,
          email: formData.get('email'),
        });
      }
      
  }
  
  

  showCreateCustomerForm = () => {
    const modal = document.getElementById('createCustomerModal');
    modal.style.display = 'block';
  }

  hideCreateCustomerForm = () => {
    const modal = document.getElementById('createCustomerModal');
    modal.style.display = 'none';
  }

  createCustomer = () => {
    // Hent formelementet fra DOM
    const customerForm = document.getElementById('customerForm');
  
    // Opret FormData-objekt med formdata
    const formData = new FormData(customerForm);
  
    // Opret dataobjekt med formdata
    const requestData = {
      customerID: Math.floor(Math.random() * 1000) + 1,
      name: formData.get('name'),
      role: formData.get('role'),
      birthday: formData.get('birthday'),
      email: formData.get('email'),
      creationYear: new Date().toISOString().split('T')[0],
      leader: null,
      salesperson: null
    };
  
    fetch(`${this.apiBaseUrl}/customer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Customer created:', data);
        this.hideCreateCustomerForm();
      })
      .catch(error => {
        console.error('Error creating customer:', error);
  
        // Log anmodningens data
        console.log('Request data:', requestData);
      });
  }
  
  addCustomerLink = () => {
    const addCustomerLink = document.getElementById('addCustomerLink');
    if (addCustomerLink) {
      addCustomerLink.addEventListener('click', () => {
        console.log('Add customer link clicked');
        this.showCreateCustomerForm();
      });
    }
  }
}

  function openMyProfileModal() {
    const modal = document.getElementById('myProfileModal');
    modal.style.display = 'block';
}

function closeMyProfileModal() {
    const modal = document.getElementById('myProfileModal');
    modal.style.display = 'none';
}

  domContentLoaded = () => {
    this.addCustomerLink();
  }

  function openMyProfileModal() {
    console.log('Opening My Profile Modal');
    const modal = document.getElementById('myProfileModal');
    modal.style.display = 'block';
}



// Opret en instans af klassen med det opdaterede API-base-URL
const yourInstance = new YourClassName('http://localhost:8080');

// Lyt efter DOMContentLoaded begivenhed
document.addEventListener('DOMContentLoaded', () => {
  yourInstance.domContentLoaded();
});
