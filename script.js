//Unspash API

const imageContainer = document.querySelector('.image-container');
let photosArray=[];

const accessKey = 'fDn70sHB5jFpAcxB67CNEJ6rLiemzlrQBicLHq_qIV4';
const apiURL = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
let ready = false;
let numberOfImagesLoaded = 0;
function imageloaded(){
    console.log('imageLoaded')
    numberOfImagesLoaded++;
    if (numberOfImagesLoaded===totalImages){
        ready = true;
        numberOfImagesLoaded = 0;
    }
    
}


function displayPhotos() {
    photosArray.forEach((photo) => {
        totalImages = photosArray.length;
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description)
        img.setAttribute('title',photo.alt_description)   
        img.classList.add('.myimg');
        item.appendChild(img);
        imageContainer.appendChild(item);
        img.addEventListener('load',imageloaded);
        
    });
}



async function getPhotos(){
    try{
        const response = await fetch (apiURL);
        photosArray  = await response.json();
        displayPhotos();
        
    } catch {
        console.log(Error)
    }
}


window.addEventListener('scroll',function(){

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 && ready ) {
        console.log("scroll");
        ready = false;
        getPhotos();
    }

});


getPhotos();


