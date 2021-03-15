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
            render();
        }
        x++;

    } else {
        alert('clicked in image please!');
    }

    if (x > 24) {
        section.removeEventListener('click', progress);
        createChart();
        x = 0;
    }
}

function createChart() {
    let context = document.getElementById('myChart').getContext('2d');
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

    let chartObject = {
        type: 'horizontalBar',
        data: {
            labels: getimgNames,
            datasets: [{
                label: 'voting results',
                backgroundColor: ['rgb(255, 478, 132)', 'rgb(0, 876, 0)', 'rgb(897, 235, 132)', 'rgb(128, 678, 0)', 'rgb(0, 255, 255)', 'rgb(089, 275, 56)', 'rgb(434, 255, 137)', 'rgb(236, 89, 132)', 'rgb(0, 355, 0)', 'rgb(255, 99, 162)', 'rgb(128, 255, 0)', 'rgb(0, 265, 255)', 'rgb(255, 255, 0)', 'rgb(295, 255, 128)', 'rgb(255, 99, 132)', 'rgb(0, 255, 0)', 'rgb(255, 99, 132)', 'rgb(128, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)',],
                borderColor: 'rgb(155, 200, 132)',
                data: getimgVotes,
            },
            {
                label: 'views results',
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(357, 255, 0)', 'rgb(255, 57, 132)', 'rgb(128, 587, 0)', 'rgb(0, 670, 255)', 'rgb(255, 255, 0)', 'rgb(897, 255, 128)', 'rgb(255, 99, 457)', 'rgb(455, 255, 0)', 'rgb(255, 99, 132)', 'rgb(128, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)', 'rgb(255, 99, 132)', 'rgb(0, 255, 0)', 'rgb(255, 99, 132)', 'rgb(128, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)'],
                borderColor: 'rgb(200, 99, 562)',
                data: getimgViews,
            }
            ]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 15,
                        fontColor: 'black',
                        fontFamily: 'cursive'
                    }
                }],
                xAxes: [{
                    barPercentage: 0.1,
                }]
            },
            legend: {
                labels: {
                    fontColor: 'black',
                    fontFamily: 'cursive',
                    fontSize: 20
                }
            }
        }
    }

    let chart = new Chart(context, chartObject);
}
render();