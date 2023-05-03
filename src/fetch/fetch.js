// import axios from 'axios';

const API_KEY = '33867943-5c281079387beab43eaa259d6';
// const BASE_URL = 'https://pixabay.com/api/';
// const PER_PAGE = 12;


//    export async function getImages(searchQuery, page = 1) {
//     try{
//       const response = await axios.get(`${BASE_URL}?q={searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`);
//       console.log(response);
//       return response.data
//     } catch (error) {
//       console.error(error);
//       return[];
//     }
//   };
const BASE_URL = 'https://pixabay.com/api/';


export function getImages(searchQuery = '', page = 1) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    });
}