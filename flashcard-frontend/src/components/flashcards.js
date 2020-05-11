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
    this.newFlashcardAnswer = document.getElementById("new-flashcard-answer");
    this.newFlashCardContainer = document.getElementById(
      "new-flashcard-container"
    );
    this.category = document.getElementById("categories-container");
    this.newCategoryContainer = document.getElementById(
      "new-category-container"
    );
    this.category.addEventListener(
      "dblclick",
      this.renderFlashcards.bind(this)
    );
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
    this.newCategoryButton = document.getElementById("new-category-button");
  }

  renderAnswer(e) {
    if (e.target && e.target.nodeName == "H4") {
      let flashcard = this.findFlashcard(e);
      e.target.innerText = `${flashcard.answer}`;
      e.target.setAttribute("id", "flashcard-answer");
      this.answer = document.getElementById("flashcard-answer");
      this.answer.addEventListener(
        "dblclick",
        this.returnToQuestion.bind(this)
      );
    }
  }

  returnToQuestion(e) {
    let flashcard = this.findFlashcard(e);
    e.target.innerText = `${flashcard.question}`;
    e.target.setAttribute("id", "flashcard-question");
    this.renderFlashcards();
  }

  findFlashcard(e) {
    let flashcardId = parseInt(e.target.getAttribute("data-id"));
    let flashcard = this.flashcards.find(
      (flashcard) => flashcard.id === flashcardId
    );
    return flashcard;
  }

  renderFlashcards() {
    this.flashcardContainer.innerHTML = "";
    let catId = parseInt(this.categoryDescription.getAttribute("data-id"));
    let categoryFlashcards = this.flashcards.filter(
      (flashcard) => flashcard.categoryId === catId
    );
    this.flashcardContainer.innerHTML = categoryFlashcards
      .map((flashcard) => flashcard.renderFlashcard())
      .join("");
    this.category.style.display = "none";
    this.categoriesButton.style.display = "inline";
    this.newCategoryButton.style.display = "none";
    this.newFlashcardButton.style.display = "inline";
    this.flashcardContainer.style.display = "inline";
    this.newFlashCardContainer.style.display = "none";
    this.flashcard = document.querySelectorAll("#flashcard-container h4");
    this.delete = document.querySelectorAll("#flashcard-container h4 div");
    this.flashcard.forEach((flashcard) =>
      flashcard.addEventListener("dblclick", this.renderAnswer.bind(this))
    );
    this.delete.forEach((element) => {
      element.addEventListener("dblclick", this.deleteFlashcard.bind(this));
    });
  }

  deleteFlashcard(e) {
    let id = parseInt(e.target.getAttribute("id"));
    this.adapter.deleteFlashcard(id);
    this.flashcards = this.flashcards.filter(flashcard => {
      return flashcard.id !== id
    })
    this.renderFlashcards();
  }

  fetchAndLoadFlashcards() {
    this.flashcards.length = 0;
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
        this.renderFlashcards();
      });
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
