class Categories {
  constructor() {
    this.categories = [];
    this.adapter = new CategoriesAdapter();
    this.initBindingsAndEventListeners();
    this.fetchAndLoadCategories();
  }

  initBindingsAndEventListeners() {
    this.categoryForm = document.getElementById("new-category-form");
    this.categoryForm.addEventListener(
      "submit",
      this.createCategory.bind(this)
    );

    this.newCategoryButton = document.getElementById("new-category-button");
    this.newCategoryButton.addEventListener(
      "click",
      this.showCategoryForm.bind(this)
    );

    this.categoriesContainer = document.getElementById("categories-container");
    this.categoriesContainer.addEventListener(
      "dblclick",
      this.setCategory.bind(this)
    );
    this.categoriesContainer.addEventListener(
      "dblclick",
      this.showFlashcards.bind(this)
    );

    this.toCategories = document.getElementById("return-to-categories");
    this.toCategories.addEventListener(
      "dblclick",
      this.goBackToCategories.bind(this)
    );

    this.categoryFormContainer = document.getElementById(
      "new-category-container"
    );
    this.description = document.getElementById("description");
    this.newCategoryName = document.getElementById("new-category-name");
    this.flashcardContainer = document.getElementById("flashcard-container");
    this.newFlashCard = document.getElementById("new-flashcard-container");
    this.categoryContainers = document.querySelectorAll(
      "#categories-container h4"
    );
    this.createFlashcard = document.getElementById("new-flashcard-form");
    this.createFlashcard.addEventListener(
      "submit",
      this.showFlashcards.bind(this)
    );
  }

  fetchAndLoadCategories() {
    this.adapter.getCategories().then((categories) => {
      categories.data.forEach((category) => {
        this.categories.push(new Category(category.attributes));
      });
      this.renderCategories(this.categories);
    });
  }

  createCategory(e) {
    e.preventDefault();
    name = this.newCategoryName.value;
    this.adapter.createCategory(name).then((category) => {
      const categoryAttributes = category.data.attributes;
      this.categories.push(new Category(categoryAttributes));
      this.newCategoryName.value = "";
      this.categoryFormContainer.style.display = "none";
      this.newCategoryButton.style.display = "inline";
      this.renderCategories();
    });
  }

  renderCategories() {
    this.categoriesContainer.innerHTML = this.categories
      .map((category) => category.renderName())
      .join("");
    this.colorize();
  }

  colorize() {
    this.categoryContainers.forEach(
      (category) => (category.style.backgroundColor = "#8884FF")
    );
  }

  goBackToCategories(e) {
    this.categoriesContainer.style.display = "inline";
    this.toCategories.style.display = "none";
    this.description.innerText = "Categories";
    this.newCategoryButton.style.display = "inline";
    this.newFlashCard.style.display = "none";
  }

  appendFlashCard(object) {
    object.included.map((flashcard) => {
      let h3 = document.createElement("h3");
      h3.innerHTML = flashcard.attributes.question;
      h3.setAttribute("class", "flashcard");
      h3.setAttribute("id", flashcard.attributes.id)
      this.flashcardContainer.appendChild(h3);
    });
  }

  setCategory(e) {
    this.description.setAttribute("data-id", e.target.getAttribute("data-id"));
    this.description.innerHTML = `${e.target.innerText}`;
  }

  showFlashcards(e) {
    e.preventDefault();
    this.flashcardContainer.innerHTML = "";
    const id = this.description.getAttribute("data-id");
    const categoryName = this.description.innerHTML;
    this.adapter.showCategory(id).then((object) => {
      this.appendFlashCard(object);
    });
    this.categoriesContainer.style.display = "none";
    this.newCategoryButton.style.display = "none";
    this.description.innerHTML = categoryName;
    this.toCategories.style.display = "inline";
    this.categoryFormContainer.style.display = "none";
  }

  // rerenderFlashcards() {
  //   this.adapter.showCategory().then((object) => {
  //     this.appendFlashCard(object);
  //   });
  // }

  showCategoryForm(e) {
    this.categoryFormContainer.style.display = "inline";
    this.newCategoryButton.style.display = "none";
  }
}
