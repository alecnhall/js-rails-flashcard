class Flashcard {
  constructor(flashcardJSON) {
    this.id = flashcardJSON.id;
    this.question = flashcardJSON.question;
    this.answer = flashcardJSON.answer;
    this.categoryId = flashcardJSON.category_id;
  }

  renderFlashcard() {
    return `<h4 class="flashcard" id="flashcard-question" data-id="${this.id}">${this.question}</h4>`;
  }
}
