class ChangeCatgegoriesToCategories < ActiveRecord::Migration[6.0]
  def change
    rename_table :catgegories, :categories
  end
end
