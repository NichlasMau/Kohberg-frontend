function getToken(){
  const localstorage_user = JSON.parse(localStorage.getItem('user'))
  return  localstorage_user.token
}

class YourClassName {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
    this.addCustomerLink(); // Call addCustomerLink during construction
  }

  domContentLoaded = () => {
    this.addCustomerLink();
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
          'Authorization': 'Bearer ' + getToken()
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
        'Authorization': 'Bearer ' + getToken()
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
  
  async updateSalesperson(salespersonID, updatedData) {
    try {
      // Fetch the existing salesperson data
      const existingSalesperson = await this.fetchSalesperson(salespersonID);

      // Merge the updated data with the existing data
      const updatedSalesperson = { ...existingSalesperson, ...updatedData };

      // Convert birthday and creationYear to the desired format
      updatedSalesperson.birthday = this.formatDate(updatedSalesperson.birthday);
      updatedSalesperson.creationYear = this.formatDate(updatedSalesperson.creationYear);

      // Prepare the request body
      const requestBody = JSON.stringify(updatedSalesperson);

      // Send the update request to the server
      const res = await fetch(`${this.apiBaseUrl}/salesperson/update/${salespersonID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: requestBody,
      });

      if (res.status >= 400) {
        const error = await res.json();
        throw new Error(`Error ${res.status}: ${error.message}`);
      }

      const responseBody = await res.json();
      console.log('Salesperson updated:', responseBody);
    } catch (err) {
      console.error('Error updating salesperson:', err.message);
    }
  }

  async showUpdateSalespersonForm() {
    try {
      const updateForm = document.getElementById('updateSalespersonForm');
      const editProfileButton = document.getElementById('editProfileButton');

      // Fetch the salesperson data for the logged-in user
      const loggedInSalespersonID = 1; // Replace with the actual salesperson ID or fetch it from the server
      const salespersonData = await this.fetchSalesperson(loggedInSalespersonID);

      // Populate the form fields with the salesperson data
      document.getElementById('updatedName').value = salespersonData.name;
      // Populate other fields similarly

      // Toggle the visibility of the update form and button
      updateForm.style.display = 'block';
      editProfileButton.style.display = 'none';
    } catch (err) {
      console.error('Error fetching salesperson data:', err.message);
    }
  }


  async fetchSalesperson(salespersonID) {
    // Fetch salesperson data from the server
    const res = await fetch(`${this.apiBaseUrl}/salesperson/update/${salespersonID}`);
    const salesperson = await res.json();
    return salesperson;
  }

  formatDate(dateString) {
    return dateString;
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


  domContentLoaded = () => {
    this.addCustomerLink();
  }

  function openMyProfileModal() {
    console.log('Opening My Profile Modal');
    const modal = document.getElementById('myProfileModal');
    modal.style.display = 'block';
}


const salespersonIDToUpdate = 1; // Replace with the actual salesperson ID
const updatedSalespersonData = {
  name: 'Updated Name',
  // Add other fields you want to update
};


// Listen for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  yourInstance.domContentLoaded();
});

function openMyProfileModal() {
  const modal = document.getElementById('myProfileModal');
  modal.style.display = 'block';
}


function closeMyProfileModal() {
  const modal = document.getElementById('myProfileModal');
  modal.style.display = 'none';
}


// Create an instance of YourClassName with the updated API base URL
const yourInstance = new YourClassName('https://kohberg-backend.azurewebsites.net');

yourInstance.updateSalesperson(salespersonIDToUpdate, updatedSalespersonData);


