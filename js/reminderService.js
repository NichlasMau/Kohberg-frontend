// Dette er klassen for fetch methoderne for reminders

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
            },
            body: JSON.stringify(reminder),
        });

        return response.json();
    }

    // Get all reminders
    async getAllReminders() {
        const response = await fetch(`${this.apiBaseUrl}/reminder/all`);
        return response.json();
    }

    // Get a specific reminder by ID
    async getReminderById(reminderId) {
        const response = await fetch(`${this.apiBaseUrl}/reminder/${reminderId}`);
        return response.json();
    }

    // Update a reminder by ID
    async updateReminder(reminderId, updatedReminderData) {
        const response = await fetch(`${this.apiBaseUrl}/reminder/update/${reminderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReminderData),
        });

        return response.json();
    }

    // Delete a reminder by ID
    async deleteReminder(reminderId) {
        await fetch(`${this.apiBaseUrl}/reminder/delete-reminder/${reminderId}`, {
            method: 'DELETE',
        });
    }

    
}
