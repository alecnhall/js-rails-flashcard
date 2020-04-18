class Category {
  constructor(categoryJSON) {
    this.id = categoryJSON.id;
    this.name = categoryJSON.name;
  }

  renderName() {
    return `<h4 class="flaschcard-category" data-id="${this.id}">${this.name.toUpperCase()}</h4>`;
  }
}
