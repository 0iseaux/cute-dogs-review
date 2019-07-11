//https://www.npmjs.com/package/serve
//https://dog.ceo/dog-api/documentation/random

const dogPix = document.querySelector('#dogpix');
let dogCount = 0;

async function getRandomDogs() {
    const randomDog = fetch('https://dog.ceo/api/breeds/image/random');
    const dogResponse = await randomDog; // wait until something comes back
    const dogData = await dogResponse.json(); // parses JSON string into native JavaScript object
    return dogData.message;
}

async function setRandomDogs() {
    const dogImg = await getRandomDogs();
    dogCount++;
    const dogSpan = document.createElement('span');
    dogPix.appendChild(dogSpan);
    dogSpan.setAttribute('id', `dog${dogCount}`);
    dogSpan.innerHTML = `<img src=\"${dogImg}\">`;
    const notCute = document.createElement('button');
    notCute.setAttribute('class', 'notCute');
    notCute.setAttribute('id', `${dogCount}notCute`);
    notCute.innerText = 'Not Cute 😓';
    dogSpan.appendChild(notCute);
    notCute.addEventListener('click', byeDog);
}

function byeDog() {
    const notCuteIdNo = parseInt(this.getAttribute('id'));
    const notCuteDog = document.querySelector(`#dog${notCuteIdNo}`);
    notCuteDog.innerHTML = '<br>🐶:😞<br>';
    notCuteDog.setAttribute('class', 'sad');
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');
    const oneMore = document.createElement('button');
    oneMore.innerText = 'One more 🐶!';
    oneMore.setAttribute('id', 'oneMore');
    container.appendChild(oneMore);
    oneMore.addEventListener('click', () => {
        setRandomDogs();
    });
    setRandomDogs();
});
