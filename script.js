const mainContainer = document.querySelector(".mainContainer");

// Array to store fetched image URLs
const images = [];

const fetchImage = () => {
  return new Promise((resolve, reject) => {
    fetch("https://picsum.photos/200/300")
      .then(response => {
        if (response.ok) {
          resolve(response.url);
        } else {
          reject("Image fetch failed");
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
const randomNumber = Math.floor(Math.random() * 11) + 20;
const fetchImages = () => {
  const requests = [];
  for (let index = 0; index < randomNumber; index++) {
    requests.push(fetchImage());
  }

  Promise.all(requests)
    .then(fetchedImages => {
      images.push(...fetchedImages);
      displayImages();
    })
    .catch(error => {
      console.error(error);
    });
};

const displayImages = () => {
  images.map(image => {
    mainContainer.innerHTML += `
      <div class="imageCards">
        <img src=${image} alt="" />
      </div>`;
  });
};

fetchImages();
