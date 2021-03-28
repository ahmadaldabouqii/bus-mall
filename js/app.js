'use strict';
let btn = document.getElementById('result_btn');

const img_names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
  'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
  'unicorn', 'usb', 'water-can', 'wine-glass'
];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const section = document.getElementById('sc');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

const extension = ['jpg', 'png', 'gif'];
function Data(name, extension) {
  this.name = name;
  this.views = 0;
  this.extension = extension;
  this.path = `./img/${name}.${extension}`;
  this.votes = 0;
  Data.holder.push(this);
}

Data.holder = [];

for (let z = 0; z < img_names.length; z++) {
  if (img_names[z] === 'usb') {
    new Data(img_names[z], extension[2]);
  } else if (img_names[z] === 'sweep') {
    new Data(img_names[z], extension[1]);
  } else {
    new Data(img_names[z], extension[0]);
  }
}

function render() {
  const leftIndex = randomNumber(0, Data.holder.length - 1);
  const leftRandomData = Data.holder[leftIndex];
  leftImage.src = leftRandomData.path;
  leftImage.title = leftRandomData.name;
  leftImage.alt = leftRandomData.name;

  const centerIndex = randomNumber(0, Data.holder.length - 1);
  const centerRandomData = Data.holder[centerIndex];
  centerImage.src = centerRandomData.path;
  centerImage.title = centerRandomData.name;
  centerImage.alt = centerRandomData.name;

  const rightIndex = randomNumber(0, Data.holder.length - 1);
  const rightRandomData = Data.holder[rightIndex];
  rightImage.src = rightRandomData.path;
  rightImage.title = rightRandomData.name;
  rightImage.alt = rightRandomData.name;
}

render();

section.addEventListener('click', progress);

let x = 0;
let ul = document.createElement('ul');
let main = document.getElementById('main');
let totalVotes;

function progress(event) {
  totalVotes = [];
  if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') {
    for (let i = 0; i < Data.holder.length; i++) {
      if (event.target.name[i] === event.target.title[i]) {
        Data.holder[i].votes++;
      }
      if (Data.holder[i].path === event.target.src || Data.holder[i].name === event.target.title) {
        Data.holder[i].views++;
      }
      render();
    }
    x++;

  } else {
    alert('clicked in image please!');
  }

  if (x > 24) {
    btn.style.visibility = 'visible';

    for (let i = 0; i < Data.holder.length; i++) {
      section.removeEventListener('click', progress);
      btn.addEventListener('click', function () {
        btn.innerHTML = 'Hide Result';
        let li = document.createElement('li');
        li.innerHTML = (Data.holder[i].name + ' had ' + Data.holder[i].votes + ' votes, and was seen  ' + Data.holder[i].views + ' times.');
        ul.appendChild(li);
        main.appendChild(ul);
      });
    }
    x = 0;
  }
}
