import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const MY_KEY = '38626503-0c946b31d6d08b2c506c34012';

const getImg = async (query, page, limit) => {
  const { data } = await axios(
    `?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
  );
  return data;
};

export default getImg;
