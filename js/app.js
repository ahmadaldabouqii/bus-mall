'use strict';

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
    this.view = 0;
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
    const centerIndex = randomNumber(0, Data.holder.length - 1);
    const rightIndex = randomNumber(0, Data.holder.length - 1);

    const leftRandomData = Data.holder[leftIndex];
    leftImage.src = leftRandomData.path;
    leftImage.title = leftRandomData.name;
    leftImage.alt = leftRandomData.name;

    const centerRandomData = Data.holder[centerIndex];
    centerImage.src = centerRandomData.path;
    centerImage.title = centerRandomData.name;
    centerImage.alt = centerRandomData.name;

    const rightRandomData = Data.holder[rightIndex];
    rightImage.src = rightRandomData.path;
    rightImage.title = rightRandomData.name;
    rightImage.alt = rightRandomData.name;
}

let x = 0;
let ul = document.createElement('ul');
let main = document.getElementById('main');
let totalVotes;
section.addEventListener('click', function (event) {
    event.preventDefault();
    totalVotes = [];
    if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') {
        for (let i = 0; i < Data.holder.length; i++) {
            if (event.target.name[i] === event.target.title[i]) {
                Data.holder[i].view++;
                Data.holder[i].votes++;
            }
            totalVotes.push(Data.holder[i].name + ' has ' + Data.holder[i].votes);
            render();
            console.log(totalVotes);
        }
        x++;
    } else {
        alert('clicked in image please!');
    }

    if (x > 24) {
        for (let i = 0; i < totalVotes.length; i++) {
            let li = document.createElement('li');
            li.innerText = totalVotes[i];
            ul.appendChild(li);
            main.appendChild(ul);
        }
        x = 0;
    }
})

console.log(Data.holder);