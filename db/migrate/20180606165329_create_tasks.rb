class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :priority
      t.datetime :due_date
      t.references :user, foreing_key: true

      t.timestamps
    end
    add_index :tasks, [:user_id, :priority]
  end
end
