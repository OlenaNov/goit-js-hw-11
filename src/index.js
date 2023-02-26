
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import markupImage from './markup-image-card';
import getImages from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

btnLoadMore.style.display = "none";

form.addEventListener('submit', onSubmit);

let queryValue = "";
let currentPage = 1;

function onSubmit(e) {
    e.preventDefault();
    queryValue = form.elements.searchQuery.value;
    console.log(queryValue);
    gallery.innerHTML = "";
    currentPage = 1;
    makeFetch();
};

async function makeFetch() {
    try {

        const fetchResult = await getImages(queryValue, currentPage);
        markupImage(fetchResult.hits, gallery);
        btnLoadMore.style.display = "block";

        if(currentPage === 1) {
            Notify.success(`Hooray! We found ${fetchResult.totalHits} images.`);
        };

        if(currentPage * 40 >= fetchResult.totalHits) {
            btnLoadMore.style.display = "none";
            Notify.warning("We're sorry, but you've reached the end of search results.");
        };

    } catch (error) {
        console.log(error);
    }
};


const lightbox = new SimpleLightbox('.gallery a', { 

    animationSpeed:	300,
  });

btnLoadMore.addEventListener('click', onBtnLoadMore);

function onBtnLoadMore() {
    currentPage += 1;
    makeFetch();
    lightbox.refresh();
};
