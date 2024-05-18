import axios from 'axios';

export default async function Delete() {
    try {
        const response = await axios.delete('http://localhost:8000/voters/delete');
        return "Account successfully deleted";
    } catch (error) {
        console.error('Error deleting account:', error);
        return "Error deleting account";
    }
}
