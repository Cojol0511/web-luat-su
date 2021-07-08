const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Axios - console app' }
    }

    let res = await axios(config)

    console.log(res.request._header);
}

makeRequest();