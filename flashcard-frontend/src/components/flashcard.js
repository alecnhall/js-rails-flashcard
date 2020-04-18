class Flashcard {
  constructor(flashcardJSON) {
    this.id = flashcardJSON.id;
    this.question = flashcardJSON.question;
    this.answer = flashcardJSON.answer;
  }

  renderFlashcard() {
    return `${this.question}`
  }
}
