import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import markupImage from './markup-image-card';
import getImages from './fetchImages';
import refs from './refs';

refs.btnLoadMore.style.display = "none";

refs.form.addEventListener('submit', onSubmit);

let queryValue = "";
let currentPage = 1;

function onSubmit(e) {
    e.preventDefault();
    queryValue = refs.form.elements.searchQuery.value;
    console.log(queryValue);
    refs.gallery.innerHTML = "";
    currentPage = 1;
    makeFetch();
};

async function makeFetch() {
    try {

        const fetchResult = await getImages(queryValue, currentPage);
        markupImage(fetchResult.hits, refs.gallery);
        refs.btnLoadMore.style.display = "block";

        if(currentPage === 1) {
            Notify.success(`Hooray! We found ${fetchResult.totalHits} images.`);
        };

        if(currentPage * 40 >= fetchResult.totalHits) {
            refs.btnLoadMore.style.display = "none";
            Notify.warning("We're sorry, but you've reached the end of search results.");
        };

    } catch (error) {
        console.log(error);
    }
};


const lightbox = new SimpleLightbox('.gallery a', { 

    animationSpeed:	300,
  });

  refs.btnLoadMore.addEventListener('click', onBtnLoadMore);

function onBtnLoadMore() {
    currentPage += 1;
    makeFetch();
    lightbox.refresh();
};

refs.gallery.addEventListener('click', onClickImage);

function onClickImage(e) {
    console.log(e.currentTarget);
}