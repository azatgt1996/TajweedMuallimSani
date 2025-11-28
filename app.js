const tg = window.Telegram.WebApp;

const lessons = [
  {
    id: 1,
    name: 'Буква "хамза"',
    description: "Звук произносится путём смыкания голосовых связок и их мгновенного размыкания.",
    intro: "ء  أَ  إِ  أُ",
  },
  {
    id: 2,
    name: 'Буква "ра"',
    description:
      "Звук произносится, когда вибрирует передняя часть спинки языка, чуть касаясь передней части твердого нёба с участием голосовых связок.",
    letter: "ر",
    intro: "رَ  ـــرِ  ـــرُ",
    words: "رَرْ رِرْ رُرْ أَرْ إِرْ أُرْ",
  },
  {
    id: 3,
    name: 'Буква "за"',
    description: `Звук произносится, когда кончик языка касается основания передних нижних зубов, а между передней частью языка и твёрдым нёбом остаётся щель.
      Через эту щель, а затем между зубами выходит звонкий свистящий звук с участием голосовых связок.`,
    letter: "ز",
    intro: "زَ  ـــزِ  ـــزُ",
    words: "أَزْ إِزْ أُزْ زَرْ زِرْ زُرْ رَزْ رِزْ رُزْ أَزْرُ إِزْرُ أُزْرُ أُرْزُ",
  },
  {
    id: 4,
    name: 'Буква "мим"',
    description: `Звук образуется при прохождении воздуха через носовую полость со смыканием губ при участии голосовых связок.`,
    letter: "م",
    intro: "مَــ  ــمِــ  ــمُ",
    words:
      "أَمْ إِمْ أُمْ مُرْ مُزْ رُمْ أَمَرَ أُمِرَ أَمْرُ إِمْرُ رَمْزُ إِرْمِ مَرْمَرُ رَمْرَمُ زَمْزَمُ أَرْزَمُ",
  },
];

const alphabetDescription = `Арабское письмо пишется справа налево. Краткие гласные (а из в арабском языке три: а - "фатха", и - "кясра", у - "дамма")
в письме выражаются особыми значками (огласовками), которые пишутся над или под согласной буквой,
при этом гласные читаются после согласных. Отсутствие гласного (закрытый слог) также имеет свой значок - "сукун".`;

const lessonSelect = document.getElementById("lesson-select");
const alphabet = document.getElementById("alphabet");
const lessonDiv = document.getElementById("lesson");
const description = document.getElementById("description");
const intro = document.getElementById("intro");
const words = document.getElementById("words");

lessonSelect.innerHTML = /*html*/ `
  <option value="0">Алфавит</option>
  <optgroup label="Буквы">
    ${lessons.map((it) => `<option value="${it.id}">${it.name}</option>`).join("")}
  </optgroup>
`;

alphabet.innerHTML = /*html*/ `
<table>
  <tr><td>ا</td><td>ب</td><td>ت</td><td>ث</td><td>ج</td><td>ح</td><td>خ</td><td></td></tr>
  <tr><td>د</td><td>ذ</td><td>ر</td><td>ز</td><td>س</td><td>ش</td><td>ص</td><td></td></tr>
  <tr><td>ض</td><td>ط</td><td>ظ</td><td>ع</td><td>غ</td><td>ف</td><td>ق</td><td></td></tr>
  <tr><td>ك</td><td>ل</td><td>م</td><td>ن</td><td>و</td><td>ه</td><td>ي</td><td>ء</td></tr>
</table>
<div class="description">${alphabetDescription}</div>
`;

const currentLessonId = "0";
lessonSelect.value = currentLessonId;
selectLesson({ value: currentLessonId });

function selectLesson({ value }) {
  if (value === "0") {
    alphabet.style.display = "block";
    lessonDiv.style.display = "none";
    return;
  }
  alphabet.style.display = "none";
  lessonDiv.style.display = "block";
  const lesson = lessons.find((it) => it.id === +value);
  const letter = lesson.letter;
  console.log(lesson);

  description.innerHTML = lesson.description;
  intro.innerHTML = lesson.intro;
  words.innerHTML = lesson.words?.replaceAll(letter, `<span class="red">${letter}</span>`) ?? "";
}

tg.expand();

tg.ready();
