const tg = window.Telegram.WebApp

const app = {
  lessons,
  alphabetContent,
  isAudioSlow: ls.get('isAudioSlow') === 'true',
  hasDescription: ls.get('hasDescription') !== 'false',
  hasHint: ls.get('hasHint') !== 'false',
  currentLessonId: ls.get('currentLessonId') || '1',
  lesson: {},
  words: '',
  toggleSpeed() {
    ls.set('isAudioSlow', (this.isAudioSlow = !this.isAudioSlow))
    this.setPlaybackRate()
  },
  skip(seconds) {
    const { duration, currentTime } = this.$refs.lessonAudio
    this.$refs.lessonAudio.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
  },
  setPlaybackRate() {
    this.$refs.lessonAudio.playbackRate = this.isAudioSlow ? 0.7 : 1
  },
  toggleDescription() {
    ls.set('hasDescription', (this.hasDescription = !this.hasDescription))
  },
  toggleHint() {
    ls.set('hasHint', (this.hasHint = !this.hasHint))
    this.setLessonWords()
  },
  setLesson() {
    ls.set('currentLessonId', this.currentLessonId)
    if (this.currentLessonId === '1') return

    this.lesson = lessons.find((it) => it.id === this.currentLessonId)
    this.$refs.lessonAudio.src = `audio_files/Буква ${this.lesson.letter}.mp3`
    this.setPlaybackRate()
    this.setLessonWords()
  },
  setLessonWords() {
    const { words = '', letter } = this.lesson
    this.words = this.hasHint ? words.replaceAll(letter, redStr(letter)) : words
  },
  mounted() {
    this.setLesson()
  },
}

tg.expand()
tg.ready()
