const charactersDiv = document.getElementById('characters');
const paginationDiv = document.querySelector('.pagination');
let currentPage = 1;
const pageSize = 20;
let totalPages = 1;


function getCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response.json())
    .then(data => {
      const characters = data.results;
      totalPages = data.info.pages;
      renderCharacters(characters);
      renderPagination(data.info);
    })
    .catch(error => {
      console.error(error);
      charactersDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
function renderCharacters(characters) {
  charactersDiv.innerHTML = '';
  characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;

    const name = document.createElement('h3');
    name.textContent = character.name;

    const likeBtn = document.createElement('button');
    likeBtn.textContent = 'Like';
    card.setAttribute("id",character.id);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(likeBtn);
    card.addEventListener('click', () => {
      localStorage.setItem('idN', character.id);   
      window.location = `info.html`;
    });
    charactersDiv.appendChild(card);
});
}
function renderPagination(info) {
  const pageButtonsElement = document.getElementById('pageButtons');
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(info.pages, startPage + maxPagesToShow - 1);
   startPage = Math.max(1, endPage - maxPagesToShow + 1);

   let pageButtonsHtml = '';
   for (let i = startPage; i <= endPage; i++) {
    const characterIndex = (i - 1) * 20; // Calculate the index of the first character on the page
    pageButtonsHtml += `<button onclick="goToPage(${i}, ${characterIndex})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
  }
  pageButtonsElement.innerHTML = pageButtonsHtml;
}


function goToPage(page) {
  page = page;
  getCharacters(page);
}

function nextPage() {
  currentPage++;
  getCharacters(currentPage);
}

function previousPage() {
  currentPage--;
  getCharacters(currentPage);
}

getCharacters(currentPage);