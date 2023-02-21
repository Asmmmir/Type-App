let symbolInMin = document.querySelector(".sym-min");
let accurate = document.querySelector(".accurate");
let mistake = document.getElementById("mistake");
let containerText = document.querySelector(".container_text");
let selected = document.querySelector(".selected");
let text = document.getElementById("text");
let keys = document.querySelectorAll(".key");
let shift = document.querySelector(".shift");
let space = document.querySelector(".space");
let backspace = document.querySelector(".backspace");

let i = 0;

let mistakesNumber = 0;
let totalKeyPresses = 0;
mistake.innerText = mistakesNumber;
let correct = 0;
let totalKeysTapped = 0;
let symbolNumber = 0;

let textLength = 0;
const milMin = 60000;

function startTyping() {
  startTime = new Date();
}

function stopTyping() {
  startTime = null;
}

function updateCPM() {
  const elapsedTime = new Date() - startTime;
  const minutes = elapsedTime / milMin;
  const cpm = Math.round(textLength / minutes);
  return cpm;
}

startTyping();


const textLetter = text.innerText.split("");
document.addEventListener('keydown', (e) => {

  
  if(e.code == 'Backspace'){
    i--
    const textLetter = text.innerText.split("");
    textLetter[i] = `<span class='selected'>${textLetter[i]}</span>`;
    text.innerHTML = textLetter.join("");
    
      }
      if(i < 0) {

        i = 0
        const textLetter = text.innerText.split("");
        textLetter[i] =  `<span class='selected'>${textLetter[0]}</span>`
        text.innerHTML = textLetter.join("");

      }

      console.log(textLetter);
      console.log(i);


      backspace.classList.add('selected')

})

document.addEventListener('keyup', () => {

backspace.classList.remove('selected')


})



document.addEventListener("keydown", (e) => {
  if (e.key == "Shift") {
    shift.classList.add("selected");
    keys.forEach((key) =>
      key.innerHTML
        .split(" ")
        .map((item) => item.toUpperCase())
        .forEach((item) => (key.innerHTML = item))
    );
  
  }

});

document.addEventListener("keyup", (e) => {
  if (e.key == "Shift") {
    shift.classList.remove("selected");
    keys.forEach((key) =>
      key.innerHTML
        .split(" ")
        .map((item) => item.toLowerCase())
        .forEach((item) => (key.innerHTML = item))
    );
  }
});

window.addEventListener("keypress", (e) => {
  keys.forEach((key) => {
    if (e.key == key.innerText) {
      key.classList.add("selected");
    } else {
      key.classList.remove("selected");
    }
  });


  if (e.key == text.innerText[i]) {
    i++;
    textLength++;
    symbolInMin.innerText = updateCPM();
    correct += 1;
    totalKeyPresses += 1;
    const textLetter = text.innerText.split("");
    textLetter[i] = `${i >= text.innerText.length ? '' : `<span class="selected">${textLetter[i]}</span>` }`
    text.innerHTML = textLetter.join("");

  } else {
    mistake.innerText = mistakesNumber += 1;
    totalKeyPresses += 1;
    const textLetter = text.innerText.split("");
    textLetter[i] = `<span class="error">${textLetter[i]}</span>`
    text.innerHTML = textLetter.join("");
  
    };

  if (i == text.innerText.length) {
    return symbolInMin.innerText = updateCPM();
  }
    

  if (e.code == "Space") {
    space.classList.add("selected");
  }


  let accuracy = (correct / totalKeyPresses) * 100;
  accurate.innerText = Math.round(accuracy) + "%";


  console.log(i);
});

// <span class="selected">${textLetter[i]}</span>