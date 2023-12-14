
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
      // Hent formelementet fra DOM
    const customerForm = document.getElementById('customerForm');

    function getToken(){
      const localstorage_user = JSON.parse(localStorage.getItem('user'))
      return  localstorage_user.token
    }
    

    // Opret FormData-objekt med formdata
    const formData = new FormData(customerForm);

     // Log token og autorisationsheader
     console.log('Token:', getToken());
     console.log('Authorization Header:', 'Bearer ' + getToken());

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
  
      const requestBody = {
        name: formData.get('name'),
        role: 'Customer',
        birthday: finalFormattedBirthday,
        email: formData.get('email')};
  
      console.log('Request Body:', requestBody);
  
      const res = await fetch(`${this.apiBaseUrl}/customer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(requestBody),
      });

      const isJson = res.headers.get('content-type')?.includes('application/json');
      const responseBody = isJson ? await res.json() : res.statusText;
      
  
      if (res.status === 401) {
        throw new Error('Unauthorized: Check your token and authorization header');
      }
      
      console.log('Customer created:', responseBody);
      this.hideCreateCustomerForm();
    }catch (err) {
      
  
      
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

 
 /* 
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
  }*/

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

/*yourInstance.updateSalesperson(salespersonIDToUpdate, updatedSalespersonData);*/


