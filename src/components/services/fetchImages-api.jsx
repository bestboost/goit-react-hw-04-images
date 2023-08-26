function fetchImages(inputValue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=29692752-5f9a27c26e6deec7970509d3f&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Upsss, no image ${inputValue}!`));
  });
}

const api = {
  fetchImages,
};

export default api;
