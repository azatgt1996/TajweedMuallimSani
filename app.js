const tg = window.Telegram.WebApp

$('#lesson-select').innerHTML = /*html*/ `
  <option value="0">Алфавит</option>
  ${lessons.map((it) => /*html*/ `<option value="${it.id}">${it.name}</option>`).join('')}
`

$('#alphabet').innerHTML = /*html*/ `
${alphabetTable}
<p>${alphabetDescription}</p>`

function skip(seconds) {
  const { duration, currentTime } = $('#lesson-audio')
  $('#lesson-audio').currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
}

let hasDescription = ls.get('hasDescription') !== 'false'
$toggleVisible('#description', hasDescription)
if (hasDescription) $cl('#description-btn').add('red')

function toggleDescription() {
  hasDescription = !hasDescription
  $cl('#description-btn').toggle('red')
  ls.set('hasDescription', hasDescription)
  $toggleVisible('#description', hasDescription)
}

let hasHint = ls.get('hasHint') !== 'false'
if (hasHint) $cl('#hint-btn').add('red')

let currentLessonId = ls.get('currentLessonId') ?? '0'
$('#lesson-select').value = currentLessonId
selectLesson(currentLessonId)

function toggleHint() {
  hasHint = !hasHint
  $cl('#hint-btn').toggle('red')
  ls.set('hasHint', hasHint)
  selectLesson(currentLessonId)
}

function selectLesson(value) {
  currentLessonId = value
  ls.set('currentLessonId', currentLessonId)
  $toggleVisible('#alphabet', value === '0')
  $toggleVisible('#lesson', value !== '0')
  if (value === '0') return

  const lesson = lessons.find((it) => it.id === +value)
  const letter = lesson.letter

  $('#description').innerHTML = lesson.description
  $('#intro').innerHTML = lesson.intro
  let text = lesson.words ?? ''
  if (hasHint) text = text.replaceAll(letter, redStr(letter))
  $('#words').innerHTML = text
}

tg.expand()
tg.ready()
