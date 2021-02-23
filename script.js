const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// api
let count=5;
const apiKey = 'BHeKtpqJxWFY_8-dqcObsGaSLUAIdnHoNaaIrtWG1ew';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// helper function to set attributes
function setAttributes(element,attributes) {
  for(const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

// check if image loaded function
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    loader.hidden = true;
    ready = true;
    count =30;
  }
}

// display photos
function displayPhotos() {
totalImages += photosArray.length;

  // run function for each object in photosArray
  photosArray.forEach((photo, i) => {
    // Create an anchor element to link to unsplash
    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target: '_blank',
    });

    // create image element for photo
    const img = document.createElement('img');
    setAttributes(img,{
      src:photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check when each event is finished Loading
    img.addEventListener('load',imageLoaded);

    // put <img> inside <a> then put bith inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });

}

// get photos from api
async function getPhotos(){
  try {
    const response  = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

  } catch (e) {
    // catch error
  }
}

// check to see if scrolling near bottom page, load more photos
window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
  {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
