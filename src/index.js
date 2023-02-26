
import getImages from './fetchImages'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('#search-form');
const boxGallery = document.querySelector('.gallery');

form.addEventListener('submit', onFetch);

let queryValue = "";
let currentPage = 1;

function onFetch(e) {
    e.preventDefault();
    queryValue = form.elements.searchQuery.value;
    console.log(queryValue);
    makeFetch();
};

async function makeFetch() {
    const fetchResult = await getImages(queryValue, currentPage);
    // const queryResult = await fetchResult.json();
    // console.log(fetchResult);
}
