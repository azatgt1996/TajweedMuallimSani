const tg = window.Telegram.WebApp

$('#lesson-select').innerHTML = lessons
  .map((it) => /*html*/ `<option value="${it.id}">${it.id}. ${it.name}</option>`)
  .join('')

$('#alphabet').innerHTML = alphabetContent

let isAudioSlow = ls.get('isAudioSlow') === 'true'
if (isAudioSlow) $cl('#slow-btn').add('active')
const setPlaybackRate = () => {
  $('#lesson-audio').playbackRate = isAudioSlow ? 0.7 : 1
}
setPlaybackRate()

function slowAudio() {
  isAudioSlow = !isAudioSlow
  ls.set('isAudioSlow', isAudioSlow)
  $cl('#slow-btn').toggle('active')
  setPlaybackRate()
}

function skip(seconds) {
  const { duration, currentTime } = $('#lesson-audio')
  $('#lesson-audio').currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
}

let hasDescription = ls.get('hasDescription') !== 'false'
$toggleVisible('#description', hasDescription)
if (hasDescription) $cl('#description-btn').add('active')

function toggleDescription() {
  hasDescription = !hasDescription
  $cl('#description-btn').toggle('active')
  ls.set('hasDescription', hasDescription)
  $toggleVisible('#description', hasDescription)
}

let hasHint = ls.get('hasHint') !== 'false'
if (hasHint) $cl('#hint-btn').add('active')

function toggleHint() {
  hasHint = !hasHint
  $cl('#hint-btn').toggle('active')
  ls.set('hasHint', hasHint)
  setLessonWords()
}

let lesson = null
let currentLessonId = ls.get('currentLessonId') ?? ALPHABET_ID
$('#lesson-select').value = currentLessonId
selectLesson(currentLessonId)

function selectLesson(value) {
  currentLessonId = value
  $('#lesson-audio').pause()
  ls.set('currentLessonId', currentLessonId)
  $toggleVisible('#alphabet', value === ALPHABET_ID)
  $toggleVisible('#lesson', value !== ALPHABET_ID)
  if (value === ALPHABET_ID) return

  lesson = lessons.find((it) => it.id === +value)
  $('#lesson-audio').src = `audio_files/lesson${lesson.id}.mp3`
  $('#description').innerHTML = lesson.description
  $('#intro').innerHTML = lesson.intro
  setPlaybackRate()
  setLessonWords()
}

function setLessonWords() {
  let text = lesson.words ?? ''
  if (hasHint) {
    const letter = lesson.letter
    text = text.replaceAll(letter, redStr(letter))
  }
  $('#words').innerHTML = text
}

tg.expand()
tg.ready()
