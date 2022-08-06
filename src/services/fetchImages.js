const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28107537-0c84d9ef5bea189e41a09827f';

export default function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
  const url = `${BASE_URL}?${params}&page=${page}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`not found`));
  });
}
