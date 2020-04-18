class FlashcardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :question, :answer, :category_id, :id
  belongs_to :category
end
