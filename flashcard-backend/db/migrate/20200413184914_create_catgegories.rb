class CreateCatgegories < ActiveRecord::Migration[6.0]
  def change
    create_table :catgegories do |t|
      t.string :name

      t.timestamps
    end
  end
end
