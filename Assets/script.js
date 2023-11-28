const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://movie-database-alternative.p.rapidapi.com/',
  params: {
    s: 'Spiderman',
    r: 'json',
    page: '1'
  },
  headers: {
    'X-RapidAPI-Key': 'fbea72eb4emsh7cdc029ca5f108fp175751jsn2e9122100265',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}