'use strict';
const orders = document.getElementById('orders');

// all images
const img_names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
    'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
    'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
    'unicorn', 'usb', 'water-can', 'wine-glass'
];

// random function

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// select Elements
const section = document.getElementById('sc');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

// constructor function 
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

// retrieve data from local storaage
function retrieveData() {
    let data = localStorage.getItem('order');
    data = JSON.parse(data);
    return data;
    // console.log(data);
}

function render() {
    const leftIndex = randomNumber(0, Data.holder.length - 1);
    const leftRandomData = Data.holder[leftIndex];
    const centerIndex = randomNumber(0, Data.holder.length - 1);
    const centerRandomData = Data.holder[centerIndex];
    const rightIndex = randomNumber(0, Data.holder.length - 1);
    const rightRandomData = Data.holder[rightIndex];

    if (leftRandomData != centerRandomData && leftRandomData != rightRandomData) {
        leftImage.src = leftRandomData.path;
        leftImage.title = leftRandomData.name;
        leftImage.alt = leftRandomData.name;
        Data.holder[leftIndex].views++;
    }

    if (leftRandomData != centerRandomData && centerRandomData != rightRandomData) {
        centerImage.src = centerRandomData.path;
        centerImage.title = centerRandomData.name;
        centerImage.alt = centerRandomData.name;
        Data.holder[centerIndex].views++;
    }

    if (rightRandomData != centerRandomData && leftRandomData != rightRandomData) {
        rightImage.src = rightRandomData.path;
        rightImage.title = rightRandomData.name;
        rightImage.alt = rightRandomData.name;
        Data.holder[rightIndex].views++;
    }

}
render();

section.addEventListener('click', progress);

let x = 0;
let main = document.getElementById('main');
let totalVotes;

function progress(event) {
    totalVotes = [];
    if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') {
        for (let i = 0; i < Data.holder.length; i++) {
            if (event.target.name[i] === event.target.title[i]) {
                Data.holder[i].votes++;
            }
            render();
        }
        x++;

    } else {
        alert('clicked in image please!');
    }

    if (x > 24) {
        section.removeEventListener('click', progress);
        DB();
        x = 0;
    }
}

function DB() {
    let getimgNames = [];
    let getimgVotes = [];
    let getimgViews = [];

    for (let i = 0; i < Data.holder.length; i++) {
        getimgNames.push(Data.holder[i].name);
    }
    for (let i = 0; i < Data.holder.length; i++) {
        getimgVotes.push(Data.holder[i].votes);
    }
    for (let i = 0; i < Data.holder.length; i++) {
        getimgViews.push(Data.holder[i].views);
    }

    localStorage.setItem('order', JSON.stringify(Data.holder));

    orders.textContent = '';
    let ordersList = retrieveData();

    if (ordersList === null) {
        ordersList = Data.holder;
    }

    for (let i = 0; i < ordersList.length; i++) {
        const li = document.createElement('li');
        li.textContent = `the votes is ${ordersList[i].votes}`;
        orders.appendChild(li);
    }
}
render();