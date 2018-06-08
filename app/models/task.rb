class Task < ApplicationRecord
    belongs_to :user
    default_scope -> { order(priority: :desc) }
    validates :title, presence: true, length: { maximum: 255 }
    validates :priority, presence: true, 
                        numericality: { only_integer: true },
                        inclusion: 0..10
    validates :due_date, presence: true
    validates :user_id, presence: true
    validate :due_date_cant_be_in_past

    private
        def due_date_cant_be_in_past
            if !!due_date && due_date < DateTime.now
                errors.add(:due_date, "can't be in past")
            end
        end
end
