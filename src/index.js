import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import markupImage from './markup-image-card';
import getImages from './fetchImages';
import refs from './refs';


refs.form.addEventListener('submit', onSubmit);

let queryValue = "";
let currentPage = 1;
const visibilityBtnLoadMore = state => refs.btnLoadMore.style.display = state;

visibilityBtnLoadMore("none");

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
        visibilityBtnLoadMore("block");

        if(currentPage === 1) {
            Notify.success(`Hooray! We found ${fetchResult.totalHits} images.`);
        };

        if(currentPage * 40 >= fetchResult.totalHits) {
            visibilityBtnLoadMore("none");
            Notify.warning("We're sorry, but you've reached the end of search results.");
        };

    } catch (error) {
        console.log(error);
    }
};


// const lightbox = new SimpleLightbox('.gallery a', { 

//     animationSpeed:	300,
//   });

//   console.log(lightbox);

  refs.btnLoadMore.addEventListener('click', onBtnLoadMore);

function onBtnLoadMore() {
    currentPage += 1;
    makeFetch();
    // lightbox.refresh();
};
