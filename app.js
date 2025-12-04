const tg = window.Telegram.WebApp;

const lessonSelect = document.getElementById("lesson-select");
const alphabet = document.getElementById("alphabet");
const lessonDiv = document.getElementById("lesson");
const description = document.getElementById("description");
const intro = document.getElementById("intro");
const words = document.getElementById("words");
const hintBtn = document.getElementById("hint-btn");
const descriptionBtn = document.getElementById("description-btn");
const audio = document.getElementById("lesson-audio");

document.querySelectorAll("[icon]").forEach((it) => {
  it.innerHTML = icons[it.attributes.icon.value];
});

lessonSelect.innerHTML = /*html*/ `
  <option value="0">Алфавит</option>
  <optgroup label="Буквы">
    ${lessons.map((it) => `<option value="${it.id}">${it.name}</option>`).join("")}
  </optgroup>
`;

alphabet.innerHTML = /*html*/ `
${alphabetTable}
<p>${alphabetDescription}</p>`;

function skip(seconds) {
  audio.currentTime = Math.max(0, Math.min(audio.duration || Infinity, audio.currentTime + seconds));
}

let hasDescription = localStorage.getItem("hasDescription") !== "false";
description.style.display = hasDescription ? "block" : "none";
if (hasDescription) {
  descriptionBtn.classList.add("red");
}

function toggleDescription() {
  hasDescription = !hasDescription;
  descriptionBtn.classList.toggle("red");
  localStorage.setItem("hasDescription", hasDescription);
  description.style.display = hasDescription ? "block" : "none";
}

let hasHint = localStorage.getItem("hasHint") !== "false";
if (hasHint) {
  hintBtn.classList.add("red");
}

let currentLessonId = localStorage.getItem("curLessonId") ?? "0";
lessonSelect.value = currentLessonId;
selectLesson({ value: currentLessonId });

function toggleHint() {
  hasHint = !hasHint;
  hintBtn.classList.toggle("red");
  localStorage.setItem("hasHint", hasHint);
  selectLesson({ value: currentLessonId });
}

function selectLesson({ value }) {
  localStorage.setItem("curLessonId", value);
  currentLessonId = value;
  alphabet.style.display = value === "0" ? "block" : "none";
  lessonDiv.style.display = value === "0" ? "none" : "block";
  if (value === "0") return;

  const lesson = lessons.find((it) => it.id === +value);
  const letter = lesson.letter;

  description.innerHTML = lesson.description;
  intro.innerHTML = lesson.intro;
  let text = lesson.words ?? "";
  if (hasHint) text = text.replaceAll(letter, redStr(letter));
  words.innerHTML = text;
}

tg.expand();
tg.ready();
