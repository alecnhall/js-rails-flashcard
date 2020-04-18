class Flashcards {
  constructor() {
    this.flashcards = [];
    this.adapter = new FlashcardsAdapter();
    this.initBindingsAndEventListeners();
    this.fetchAndLoadFlashcards();
  }

  initBindingsAndEventListeners() {
    this.newFlashcardQuestion = document.getElementById(
      "new-flashcard-question"
    );
    this.flashcardContainer = document.getElementById("flashcard-container");
    this.newFlashcardAnswer = document.querySelector(".new-flashcard-answer");
    this.newFlashCardContainer = document.getElementById(
      "new-flashcard-container"
    );
    this.category = document.getElementById("categories-container");
    this.category.addEventListener("dblclick", this.showCategoryFlashCards.bind(this));
    this.flashcardForm = document.getElementById("new-flashcard-form");
    this.flashcardForm.addEventListener(
      "submit",
      this.createFlashcard.bind(this)
    );
    this.categoryDescription = document.getElementById("description");
    this.newFlashcardButton = document.getElementById("new-flashcard-button");
    this.newFlashcardButton.addEventListener(
      "click",
      this.showNewFlashcardContainer.bind(this)
    );
    this.categoriesButton = document.getElementById("return-to-categories");
    this.categoriesButton.addEventListener(
      "dblclick",
      this.backToCategories.bind(this)
    );
    this.flashcardContainer = document.getElementById("flashcard-container");
  }

  fetchAndLoadFlashcards() {
    this.adapter.getFlashcards().then((flashcards) => {
      flashcards.data.forEach((flashcard) => {
        this.flashcards.push(new Flashcard(flashcard.attributes));
      });
    });
  }

  createFlashcard(e) {
    e.preventDefault();
    const answer = this.newFlashcardAnswer.value;
    const question = this.newFlashcardQuestion.value;
    const categoryId = this.categoryDescription.getAttribute("data-id");
    this.adapter
      .createFlashcard(question, answer, categoryId)
      .then((flashcard) => {
        const flashcardAttributes = flashcard.data.attributes;
        this.flashcards.push(new Flashcard(flashcardAttributes));
        this.newFlashcardQuestion.value = "";
        this.newFlashcardAnswer.value = "";
        this.newFlashCardContainer.style.display = "none";
        this.newFlashcardButton.style.display = "inline";
        // return rerenderFlashcards(categoryId);
      })
  }

  showCategoryFlashCards(e) {
    this.newFlashcardButton.style.display = "inline";
    this.flashcardContainer.style.display = "inline";
    this.newFlashCardContainer.style.display = "none"
  }

  showNewFlashcardContainer(e) {
    this.newFlashCardContainer.style.display = "inline";
    this.newFlashcardButton.style.display = "none";
  }

  backToCategories(e) {
    this.newFlashcardButton.style.display = "none";
    this.flashcardContainer.style.display = "none";
    this.flashcardContainer.innerHTML = "";
  }
}
