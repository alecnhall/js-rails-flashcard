class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update]
  def index
    @categories = Category.all 
    options = {
      include: [:flashcards]
    }
    render json: CategorySerializer.new(@categories, options), status: 200
  end

  def show
    options = {
     include: [:flashcards]
    }
    render json: CategorySerializer.new(@category, options), status: 200
  end

  def create
    @category = Category.create(category_params)
      
    render json: CategorySerializer.new(@category), status: 200
  end

  def update
    if @category.update(category_params)
      render :show, status: :created, location: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private 

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
