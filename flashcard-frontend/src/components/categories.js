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

    this.newCategory = document.getElementById("new-category-container")

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
  }

  goBackToCategories(e) {
    this.categoriesContainer.style.display = "inline";
    this.toCategories.style.display = "none";
    this.description.innerText = "Categories";
    this.newCategoryButton.style.display = "inline";
    this.newFlashCard.style.display = "none";
    this.newCategoryButton.style.display = "inline"
  }

  setCategory(e) {
    this.description.setAttribute("data-id", e.target.getAttribute("data-id"));
    this.description.innerHTML = `${e.target.innerText}`;
  }

  showCategoryForm(e) {
    this.categoryFormContainer.style.display = "inline";
    this.newCategoryButton.style.display = "none";
  }
}
