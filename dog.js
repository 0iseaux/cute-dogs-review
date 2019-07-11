//https://www.npmjs.com/package/serve
//https://dog.ceo/dog-api/documentation/random

const dogPix = document.querySelector('#dogpix');
let dogCount = 0;
let cuteDogCount = 0;

async function getRandomDogs() {
    const randomDog = fetch('https://dog.ceo/api/breeds/image/random');
    const dogResponse = await randomDog; // wait until something comes back
    const dogData = await dogResponse.json(); // parses JSON string into native JavaScript object
    return dogData.message;
}

async function setRandomDogs() {
    const dogImg = await getRandomDogs();
    dogCount++;

    dogsCount.innerHTML = `dogs: ${dogCount}`;
    const dogSpan = document.createElement('span');
    dogPix.appendChild(dogSpan);
    dogSpan.setAttribute('id', `dog${dogCount}`);
    dogSpan.innerHTML = `<img src=\"${dogImg}\">`;

    const cute = document.createElement('button');
    cute.setAttribute('class', 'cute');
    cute.setAttribute('id', `${dogCount}cute`);
    cute.innerText = '😍';
    dogSpan.appendChild(cute);
    cute.addEventListener('click', loveDog);

    const notCute = document.createElement('button');
    notCute.setAttribute('class', 'notCute');
    notCute.setAttribute('id', `${dogCount}notCute`);
    notCute.innerText = 'Not Cute 😓';
    dogSpan.appendChild(notCute);
    notCute.addEventListener('click', byeDog);
}

function loveDog() {
    cuteDogCount++;
    document.querySelector('#cuteDogsCount').innerHTML = `cute dog(s): ${cuteDogCount}`;
    const cuteIdNo = parseInt(this.getAttribute('id'));
    const cuteDog = document.querySelector(`#dog${cuteIdNo}`);
    cuteDog.children[0].style.borderColor = randomColor();
    document.getElementById(`${cuteIdNo}cute`).removeEventListener('click', loveDog);
    document.getElementById(`${cuteIdNo}notCute`).removeEventListener('click', byeDog);
}

function byeDog() {
    const notCuteIdNo = parseInt(this.getAttribute('id'));
    const notCuteDog = document.querySelector(`#dog${notCuteIdNo}`);
    notCuteDog.innerHTML = '🐶:😞';
    notCuteDog.setAttribute('class', 'sad');
    notCuteDog.style.backgroundColor = randomColor();
    notCuteDog.style.borderColor = 'rgba(255,255,255,1)'; //make opaque
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');

    const oneMore = document.createElement('button');
    oneMore.innerText = '+🐶!';
    oneMore.setAttribute('id', 'oneMore');
    container.appendChild(oneMore);

    const dogsCount = document.createElement('div');
    dogsCount.setAttribute('id', 'dogsCount');
    dogsCount.setAttribute('class', 'count');
    container.appendChild(dogsCount);

    const cuteDogsCount = document.createElement('div');
    cuteDogsCount.setAttribute('id', 'cuteDogsCount');
    cuteDogsCount.setAttribute('class', 'count');
    container.appendChild(cuteDogsCount);

    oneMore.addEventListener('click', () => {
        setRandomDogs();
    });
    setRandomDogs();
});
