// write your code here
document.addEventListener('DOMContentLoaded', () => {

  let allRamen;
  const ramenMenu = document.querySelector('#ramen-menu')
  const ramenDetails = document.querySelector('#ramen-detail')
  const ramenRating = document.querySelector('#rating-display')
  const ramenComment = document.querySelector('#comment-display')
  const newRamenForm = document.querySelector('#new-ramen')

  function initialPageRender() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
      allRamen = data
      renderRamenImages(allRamen)
    })
  }//GET fetch ends

  function renderRamenImages(allRamen) {
    ramenMenu.innerHTML = allRamen.map(renderEachImage).join('')
  }

  function renderEachImage(ramen) {
    return `
    <img id='${ramen.id}' class='ramen-image' src='${ramen.image}'>
    `
  }

  initialPageRender();

  document.addEventListener('click', (e) => {
    if(e.target.className === 'ramen-image') {
      const foundRamen = allRamen.find(ramen => ramen.id === parseInt(e.target.id))
      renderRamenDetails(foundRamen)
    }
    
  })//click event ends

  function renderRamenDetails(foundRamen) {
    ramenDetails.innerHTML = `
    <img src="${foundRamen.image}" class="detail-image" alt="Good Soup" />
    <h2 class="name">${foundRamen.name}</h2>
    <h3 class="restaurant">${foundRamen.restaurant}</h3>
    `
    ramenRating.innerText = foundRamen.rating
    ramenComment.innerText = foundRamen.comment
  }//ramen details ends

  newRamenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    const newName = form.querySelector('#new-name').value
    const newRestaurant = form.querySelector('#new-restaurant').value
    const newImage = form.querySelector('#new-image').value
    const newRating = form.querySelector('#new-rating').value
    const newComment = form.querySelector('#new-comment').value

    let newRamenAdded = {
      name: newName, 
      restaurant: newRestaurant, 
      image: newImage, 
      rating: newRating, 
      comment: newComment
    }

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamenAdded)
    })
    .then(resp => resp.json())
    .then(data => {
      ramenMenu.innerHTML += renderEachImage(data)
    })
  })

})//code ends