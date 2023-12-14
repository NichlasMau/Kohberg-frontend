// Dette er klassen for fetch methoderne for reminders
function getToken(){
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    return  localstorage_user.token
  }
  
class ReminderService {
    
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }


    // Create a new reminder
    async createReminder(reminder) {
        const response = await fetch(`${this.apiBaseUrl}/reminder/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(reminder),
        });

        return response.json();
    }

    // Get all reminders
    async getAllReminders() {
        const response = await fetch(`${this.apiBaseUrl}/reminder/all`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        })
        return response.json();
    }

    // Get a specific reminder by ID
    async getReminderById(reminderId) {
        const response = await fetch(`${this.apiBaseUrl}/reminder/${reminderId}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        })
        return response.json();
    }

    // Update a reminder by ID
    async updateReminder(reminderId, updatedReminderData) {
        const response = await fetch(`${this.apiBaseUrl}/reminder/update/${reminderId}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(updatedReminderData),
        });

        return response.json();
    }

    // Delete a reminder by ID
    async deleteReminder(reminderId) {
        await fetch(`${this.apiBaseUrl}/reminder/delete-reminder/${reminderId}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        });
    }

    
}