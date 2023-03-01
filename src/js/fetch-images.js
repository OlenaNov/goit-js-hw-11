import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://pixabay.com/api/";
const KEY = "28883185-baf66725e1fe3e306d813d750";

export default async function getImages(query, page) {
    try {
      const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
          if(response.data.total === 0) {
        throw new Error(Notify.failure('Sorry, there are no images matching your search query. Please try again.'));
      };
      
      return response.data;

    } catch (error) {
      console.log(error);
    }
  }

