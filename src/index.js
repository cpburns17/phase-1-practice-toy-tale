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
.then(res => res.json())
.then(data => {
  console.log(data)
  submitToy(data)
  for (let i of data) {
    renderToys(i)
  }
})


function renderToys (toys) {

  let toyCollection = document.querySelector('#toy-collection');

  let divElement = document.createElement('div')
  divElement.className = 'card'

  let toyName = document.createElement('h2')
  toyName.textContent = toys.name;

  let toyImage = document.createElement('img')
  toyImage.src = toys.image;
  toyImage.className = 'toy-avatar';

  let toyLikes = document.createElement('p')
  toyLikes.textContent = toys.likes + " likes"

  let toyButton = document.createElement('button')
  toyButton.textContent = 'Like ❤️'
  toyButton.className = 'like-btn';
  toyButton.id = toys.id;
  
  toyCollection.append(divElement)
  divElement.append(toyName, toyImage, toyLikes, toyButton)

//

let count = toys.likes
toyButton.addEventListener('click', () => {
  count++;
  toyLikes.textContent = count + " likes"

  fetch(`http://localhost:3000/toys/${toys.id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      likes: count
    })
  })
})

}
let toyCollection = document.querySelector('#toy-collection')

function submitToy (toys) {
  let toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let createToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  console.log(e.target.name.value)

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'Accept' : 'application/json',
      },
    body: JSON.stringify(createToy)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      renderToys(data)
    })
  })
}


