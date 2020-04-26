class Flashcard {
  constructor(flashcardJSON) {
    this.id = flashcardJSON.id;
    this.question = flashcardJSON.question;
    this.answer = flashcardJSON.answer;
    this.categoryId = flashcardJSON.category_id;
  }

  renderFlashcard() {
    return `<h4 class="flashcard" id="flashcard-question" data-id="${this.id}">
    ${this.question}
    <div>
      <img id="${this.id}" src="https://img.icons8.com/metro/26/000000/delete-sign.png"/>
    </div>
    </h4>`;
  }
}
