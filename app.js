const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let meaningsHTML = data[0].meanings
        .map((meaning) => {
          let definitionsHTML = meaning.definitions
            .map((definition) => {
              return `
            <div class="word-meaning">
              <p>${definition.definition}</p>
              <p class="word-example">${definition.example || ""}</p>
              <br>
            </div>
          `;
            })
            .join("");

          return `
          <div class="details">
            <p>${meaning.partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
            ${definitionsHTML}
          </div>
        `;
        })
        .join("");

      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        ${meaningsHTML}
      `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Word not Found</h3>`;
    });
});

function playSound() {
  sound.play();
}
