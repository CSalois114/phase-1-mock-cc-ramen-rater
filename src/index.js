document.addEventListener('DOMContentLoaded', () => {
  getRamenList();
  addNewRamenFormFunc();
  addEditRamenFormFunc();
  changeDisplayToFirstRamen();
})

function changeDisplayToFirstRamen() {
  fetch('http://localhost:3000/ramens/1')
  .then(res => res.json())
  .then(firstRamen => changeDisplayRamen(firstRamen));
}

function getRamenList () {
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramens => {
    ramens.forEach(ramen => {
      addRamenToList(ramen)
    })
  })
}

function addRamenToList(ramen) {
  const newRamenImg = document.createElement('img');

  newRamenImg.src = ramen.image;
  newRamenImg.alt = ramen.name;
  document.getElementById('ramen-menu').append(newRamenImg);

  newRamenImg.addEventListener('click', () => {
    changeDisplayRamen(ramen);
  })
}

function changeDisplayRamen(ramen) {
  const detailImage = document.querySelector('.detail-image');
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;

  document.querySelector('.name').innerText = ramen.name;
  document.querySelector('.restaurant').innerText = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
}

function addNewRamenFormFunc() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
      name: form.elements['name'].value,
      restaurant: form.elements['restaurant'].value,
      image: form.elements['image'].value,
      rating: form.elements['rating'].value,
      comment: form.elements['new-comment'].value
    }
    addRamenToList(newRamen);
  })
}

function addEditRamenFormFunc() {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('rating-display').textContent= editForm['rating'].value;
    document.getElementById('comment-display').textContent = editForm['new-comment'].value;
  })
}