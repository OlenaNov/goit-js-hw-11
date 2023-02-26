import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "/pixabay.com/api/";
const KEY = '28883185-baf66725e1fe3e306d813d750';


export default async function getImages(query, page) {
    try {
      const url = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
      const response = await axios.get(url);
      //     if(!response.ok) {
      //   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      //   // throw new Error(response.statusText);
      // };
      // const result = await response.json();
      console.log(response);
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

