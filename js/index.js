document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', (e) => {
      clearDisplay();
  
      let query = extractText();
      displayUsers(query);
  
      clearSearchBox();
  
      e.preventDefault();
    });
  });
  
  function clearDisplay() {
    const parentNode = document.querySelector('#user-list');
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }
  
  function clearSearchBox() {
    const searchBox = document.querySelector('#search');
    searchBox.value = '';
  }
  
  function extractText() {
    const searchBox = document.querySelector('#search');
    return searchBox.value;
  }
  
  function displayUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const parentNode = document.querySelector('#user-list');
  
        data.items.forEach((item) => {
          createNodes(parentNode, item);
        });
      });
  }
  
  function createNodes(parentNode, item) {
    const container = document.createElement('div');
  
    const userName = document.createElement('p');
    const avatarUrl = document.createElement('img');
    const profileUrl = document.createElement('a');
  
    avatarUrl.src = item.avatar_url;
    userName.innerText = item.login;
    profileUrl.text = item.html_url;
  
    container.appendChild(userName);
    container.appendChild(avatarUrl);
    container.appendChild(profileUrl);
  
    parentNode.appendChild(container);
  }