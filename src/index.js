let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.querySelector('#toy-collection');
    toys.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'card';

      const name = document.createElement('h2');
      name.textContent = toy.name;

      const image = document.createElement('img');
      image.src = toy.image;
      image.className = 'toy-avatar';

      const likes = document.createElement('p');
      likes.textContent = `${toy.likes} Likes`;

      const likeBtn = document.createElement('button');
      likeBtn.className = 'like-btn';
      likeBtn.textContent = 'Like <3';
      likeBtn.dataset.id = toy.id;

      card.append(name, image, likes, likeBtn);
      toyCollection.appendChild(card);
    });
  });

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.querySelector('#toy-collection');
    toys.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'card';

      const name = document.createElement('h2');
      name.textContent = toy.name;

      const image = document.createElement('img');
      image.src = toy.image;
      image.className = 'toy-avatar';

      const likes = document.createElement('p');
      likes.textContent = `${toy.likes} Likes`;

      const likeBtn = document.createElement('button');
      likeBtn.className = 'like-btn';
      likeBtn.textContent = 'Like <3';
      likeBtn.dataset.id = toy.id;

      likeBtn.addEventListener('click', (event) => {
        const toyId = event.target.dataset.id;
        const likesText = event.target.previousSibling;
        const likesCount = parseInt(likesText.textContent);
        const newLikesCount = likesCount + 1;

        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ likes: newLikesCount })
        })
          .then(response => response.json())
          .then(updatedToy => {
            likesText.textContent = `${updatedToy.likes} Likes`;
          })
          .catch(error => console.error(error));
      });

      card.append(name, image, likes, likeBtn);
      toyCollection.appendChild(card);
    });
  });
