import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import markupImage from '../js/markup-image-card';
import getImages from './fetch-images';
import refs from '../js/refs';


refs.form.addEventListener('submit', onSubmit);

let queryValue = "";
let currentPage = 1;
const visibilityBtnLoadMore = state => refs.btnLoadMore.style.display = state;

visibilityBtnLoadMore("none");

function onSubmit(e) {
    e.preventDefault();
    queryValue = refs.form.elements.searchQuery.value;
    refs.gallery.innerHTML = "";
    currentPage = 1;
    makeFetch();
};

async function makeFetch() {
    try {

        const fetchResult = await getImages(queryValue, currentPage);
        markupImage(fetchResult.hits, refs.gallery);
        lightbox.refresh();
        visibilityBtnLoadMore("block");

        if(currentPage === 1) {
            Notify.success(`Hooray! We found ${fetchResult.totalHits} images.`);
        };

        if(currentPage !== 1) {
            makeSmoothPageScrolling();
        };

        if(currentPage * 40 >= fetchResult.totalHits) {
            visibilityBtnLoadMore("none");
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

};

function makeSmoothPageScrolling() {
    
const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
};

refs.gallery.lastElementChild.addEventListener('scroll', makeInfiniteScroll);

function makeInfiniteScroll () {
    console.log('FINISH');
};