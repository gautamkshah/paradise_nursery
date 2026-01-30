import axios from 'axios';

async function test() {
    try {
        console.log("Testing GET http://localhost:3001/api/categories ...");
        const res = await axios.get('http://localhost:3001/api/categories');
        console.log("Status:", res.status);
        console.log("Data:", res.data);
    } catch (error: any) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
        }
    }
}

test();
