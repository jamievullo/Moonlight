class CreatePlanets < ActiveRecord::Migration[6.0]
  def change
    create_table :planets do |t|
      t.string :name
      t.string :size
      t.string :distance
      t.string :orbital_period
      t.string :day_length
      t.string :gravity
      t.string :description
      t.string :link
      t.boolean :has_moons

      t.timestamps
    end
  end
end
