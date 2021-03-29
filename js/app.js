'use strict';
const img_names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep',
  'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
];

function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const section = document.getElementById('sc');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

// const extension = ['jpg', 'png', 'gif'];
// function Prodcts(name, extension) {
//   this.name = name;
//   this.views = 0;
//   this.extension = extension;
//   this.path = `./img/${name}.${extension}`;
//   this.votes = 0;
//   Prodcts.holder.push(this);
// }

function Prodcts(name) {
  this.name = name;
  if(name === 'usb'){
    this.extension = '.gif';
  } else if (name === 'sweep'){
    this.extension = '.png';
  }else{
    this.extension = '.jpg';
  }
  this.path = './img/' + this.name + this.extension;
  this.views = 0;
  this.votes = 0;
  Prodcts.holder.push(this);
}
Prodcts.holder = [];

for(let i = 0; i < img_names.length; i++){
  new Prodcts(img_names[i]);
}

function randomImage() {
  const leftIndex = randomIndex(0, Prodcts.holder.length - 1);
  const leftRandomData = Prodcts.holder[leftIndex];
  leftImage.src = leftRandomData.path;
  leftImage.alt = leftRandomData.name;
  leftImage.title = leftRandomData.name;
  leftRandomData.views++;

  const centerIndex = randomIndex(0, Prodcts.holder.length - 1);
  if(centerIndex !== leftIndex){
    const centerRandomData = Prodcts.holder[centerIndex];
    centerImage.src = centerRandomData.path;
    centerImage.alt = centerRandomData.name;
    centerImage.title = centerRandomData.name;
    centerRandomData.views++;
  }

  const rightIndex = randomIndex(0, Prodcts.holder.length - 1);
  if(rightIndex !== centerIndex && rightIndex !== leftIndex){
    const rightRandomData = Prodcts.holder[rightIndex];
    rightImage.src = rightRandomData.path;
    rightImage.alt = rightRandomData.name;
    rightImage.title = rightRandomData.name;
    rightRandomData.views++;
  }
}
randomImage();

let main = document.getElementById('main');
section.addEventListener('click', progress);
let attempts = 25;
let counter = 0;

function progress(event) {
  if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') {
    for (let i = 0; i < Prodcts.holder.length; i++) {
      if (Prodcts.holder[i].name === event.target.title) {
        Prodcts.holder[i].votes++;
        counter++;
        console.log('votes inside if: ' + Prodcts.holder[i].votes);
        console.log('counter inside if: ' + counter);
        console.log(Prodcts.holder[i].name);
        console.log(event.target.title);
      }
      console.log('im inside for');
    }
    console.log(' ');
    randomImage();
  } else {
    alert('clicked in image please!');
  }

  if(counter === attempts) {
    section.removeEventListener('click', progress);
    let button = document.createElement('button');
    button.style.visibility = 'visible';
    main.appendChild(button);
    button.textContent = 'Results';
    button.addEventListener('click',resultDisplay);
  }
}

function resultDisplay(){
  let ul = document.createElement('ul');
  main.appendChild(ul);
  for (let i = 0; i < Prodcts.holder.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerText = Prodcts.holder[i].name + ' had ' + Prodcts.holder[i].votes + ' votes, and was seen  ' + Prodcts.holder[i].views + ' times.';
  }
}
