class FlashcardsAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/flashcards";
  }

  async getFlashcards() {
    const res = await fetch(this.baseUrl);
    return await res.json();
  }

  async createFlashcard(question, answer, id) {
    const flashcard = {
      question: question,
      answer: answer,
      category_id: id
    };
    
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ flashcard }),
    });
    return await res.json();
  }
}
