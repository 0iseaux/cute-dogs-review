//https://www.npmjs.com/package/serve
//https://www.npmjs.com/package/random-puppy not working?
//https://dog.ceo/dog-api/documentation/random

let allDogs = [];
const dogPix = document.querySelector('#dogpix');

async function getRandomDogs() {
    const randomDog = fetch('https://dog.ceo/api/breeds/image/random');
    const dogResponse = await randomDog; // wait until something comes back
    const dogData = await dogResponse.json(); // parses JSON string into native JavaScript object
    return dogData.message;
}

async function setRandomDogs() {
    allDogs.push(await getRandomDogs());
    updateDOM();
}

function updateDOM() {
    dogPix.innerHTML = '';
    //const dogSpan = document.createElement('div');

    allDogs.forEach((dogImg, index) => {
        const dogSpan = document.createElement('span');
        dogPix.appendChild(dogSpan);
        dogSpan.setAttribute('id', `dog${index}`);
        dogSpan.innerHTML = `<img src=\"${dogImg}\">`;
        //console.log(index); index works fine here
        const notCute = document.createElement('button');
        notCute.setAttribute('class', 'notCute');
        notCute.innerText = 'Not Cute 😓';
        dogSpan.appendChild(notCute);
        notCute.addEventListener('click', (dogImg, index) => {
            //seems dogImg is always the first one...
            byeDog(dogImg, index);
        });
    });
}

function byeDog(dogImg, index) {
    //weird removal pattern..............
    //console.log(allDogs[0]); this works
    //console.log(allDogs[index]); // undefined
    //console.log(index); // ?MouseEvent {isTrusted: true, screenX: 262, screenY: 633, clientX: 231, clientY: 525, …}??
    //document.querySelector(`#dog${index}`).innerHTML = `<span class=\"sad\>🐶:😞</span>`;
    const ind = allDogs.indexOf(dogImg);
    //console.log(ind);//WHY ALWAYS -1???
    //document.querySelector(`#dog${index + 1}`).innerHTML = "<span class='sad'>🐶:😞</span>"; //????? trying to get around the 'index' issue
    //// allDogs.splice(ind, 1); // index =??
    allDogs.splice(ind, 1); // BUT SPLICE works here with 'index'
    updateDOM();
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
