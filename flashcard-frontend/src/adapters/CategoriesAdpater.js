class CategoriesAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/categories";
  }

  async getCategories() {
    const res = await fetch(this.baseUrl);
    return await res.json();
  }

  async createCategory(value) {
    const category = {
      name: value,
    };
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category }),
    });
    return await res.json();
  }

  async showCategory(id){
    const res = await fetch(`${this.baseUrl}/${id}`);
    return await res.json();  
  }
}
