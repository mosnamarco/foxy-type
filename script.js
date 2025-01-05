const WORDS_LENGTH = 20;
const WORDBANK = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "the",
  "lazy",
  "dog",
];

let target = document.getElementById("target");
let input = document.getElementById("input");
let points = document.getElementById("points");
let i_points = 0;

let to_type_target = [];
for (let i = 0; i < WORDS_LENGTH; i++) {
  to_type_target.push(WORDBANK[Math.round(Math.random() * 9)]);
}

target.innerText = to_type_target.toString().replaceAll(",", " ");

window.addEventListener("keydown", (ev) => {
  let filtered_target = [];
  if (ev.key == " ") {
    if (to_type_target[0] === input.innerText) {
      filtered_target = to_type_target.filter((val, i) => {
        if (i !== 0) {
          return val;
        }
      });
      i_points += Math.round((to_type_target[0].length * 420) / 69);
      target.innerText = filtered_target.toString().replaceAll(",", " ");
      to_type_target = filtered_target;
      points.innerText = i_points;

      if (to_type_target.length === 0) {
        for (let i = 0; i < WORDS_LENGTH; i++) {
          to_type_target.push(WORDBANK[Math.round(Math.random() * 9)]);
          target.innerText = to_type_target.toString().replaceAll(",", " ");
        }
      }
    } else {
      target.innerHTML =
        `<span style="color: red; text-decoration: underline;">${to_type_target[0]}</span> ` +
        to_type_target
          .filter((val, i) => {
            if (i !== 0) {
              return val;
            }
          })
          .toString()
          .replaceAll(",", " ");
    }

    input.innerText = "";
  }

  if (isAlpha(ev.key)) {
    input.innerText += ev.key;
  }
});

function isAlpha(key) {
  let validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (validCharacters.includes(key)) {
    return true;
  }

  return false;
}
