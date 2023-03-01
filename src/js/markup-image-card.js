
export default async function markupImage(arrImages, element) {

    const markap = arrImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    `<a href="${largeImageURL}" class="gallery__item">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div></a>`
    ).join('');

    element.insertAdjacentHTML("beforeend", markap);
};
