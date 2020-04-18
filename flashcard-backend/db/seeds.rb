# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create([
    {name: 'JavaScript'},
    {name: 'Ruby'},
    {name: 'Ruby on Rails'},
    {name: 'React'}
])

Flashcard.create([
    {question: 'What selector method can you use to target the ID of a DOM element?', answer: 'getElementByID', category_id: 1},
    {question: 'What does Ruby on Rails use for Object Relationship Mapping (ORM)?', answer: 'ActiveRecord', category_id: 3},
    {question: 'Who developed the React framework?', answer: 'Facebook', category_id: 4},
    {question: 'What tyope of language is Ruby?', answer: 'Ruby is a pure Object-Oriented language.', category_id: 2}

])