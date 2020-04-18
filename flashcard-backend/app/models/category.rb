class Category < ApplicationRecord
    has_many :flashcards
    validates :name, uniqueness: true, presence: true
end
