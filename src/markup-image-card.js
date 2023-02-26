
function markupImage(arrImages) {

    const markap = arrImages.map(elementImage => 
    `<div class="photo-card">
        <img src="${arrImages.webformatURL}" alt="${arrImages.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${arrImages.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${arrImages.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${arrImages.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${arrImages.downloads}
          </p>
        </div>
    </div>`
    );
    
    return markap;
}
