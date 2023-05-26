const result = document.querySelector(".result");
const inputText = document.getElementById("input__text");
const searchBtn = document.getElementById("search__btn");
const audio = document.getElementById("audio");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const getData = () => {
  const inputWord = inputText.value.trim();

  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      renderUI(data, inputWord);
    })
    .catch(() => renderError());
};

function renderUI(data, inputWord) {
  result.innerHTML = `
    <div class="word">
        <h3>${inputWord.charAt(0).toUpperCase() + inputWord.slice(1)}</h3>
        <button onClick="playAudio()">
            <i class="fas fa-volume-up"></i>
        </button>
    </div>

    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetics[0].text}</p>
    </div>

    <p class="word__meaning">${
      data[0].meanings[0].definitions[0].definition
    }</p>
    <p class="word__example">${
      data[0].meanings[0].definitions[0].example || ""
    }</p>
    `;

  audio.setAttribute("src", `${data[0].phonetics[0].audio}`);
}

function renderError() {
  result.innerHTML = `
    <h3 class="error">Couldn't find the word</h3>
    `;
}

function playAudio() {
  audio.play();
}

searchBtn.addEventListener("click", getData);
inputText.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    getData();
  }
});
