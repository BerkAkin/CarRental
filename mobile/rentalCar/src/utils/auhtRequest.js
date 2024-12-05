import axios from 'axios';
import { API_URL } from '@env';

export async function createUser(fullName, email, password, phoneNumber, birthDate, roles = ['user']) {
    const url = `${API_URL}/Auth/register`;

    console.log('url :', url);

    const body = JSON.stringify({
        email,
        password,
        fullName,
        phoneNumber,
        birthDate,
        roles,
    });

    console.log(body);

    try {
        const response = await axios.post(url, body, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        });
        console.log('response : ', response);
        return response.data;
    } catch (error) {
        console.error('Error during sign-up:', error.response ? error.response.data : error.message);
        throw error; // rethrow the error to be caught in the calling function
    }
}

//deneme
export async function getBlogs() {
    const url = `${API_URL}/blogs/get-all`
    console.log(url);

    try {
        const response = await axios.get(url);
        console.log('response : ', response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Server error response: ', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error or no response: ', error.request);
        } else {
            // Something else happened while setting up the request
            console.error('Error during sign-up setup: ', error.message);
        }
        throw error; // rethrow the error to be caught in the calling function
    }
}