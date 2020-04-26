class Api::V1::FlashcardsController < ApplicationController
  before_action :set_flashcard, only: [:show, :update, :destroy]
  def index
    @flashcards = Flashcard.all 
    render json: FlashcardSerializer.new(@flashcards), status: 200
  end

  def show
    render json: FlashcardSerializer.new(@flashcard), show: 200
  end

  def create
    @flashcard = Flashcard.create(flashcard_params)
      
    render json: FlashcardSerializer.new(@flashcard), status: 200
  end

  def update
    @flashcard.update(todo_params)
    render :show
  end

  def destroy
    @flashcard.destroy
  end

  private 

  def set_flashcard
    @flashcard = Flashcard.find(params[:id])
  end

  def flashcard_params
    params.require(:flashcard).permit(:question, :answer, :category_id)
  end
end
