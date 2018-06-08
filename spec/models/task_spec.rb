require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:user) { user = User.new(first_name: "FirstName",
                      last_name: "LastName",
                      email: "someemail@example.com",
                      password: "password",
                      password_confirmation: "password")
              user.save
              return user }
  before(:each) do
    @task = user.tasks.build(
      title: "Title",
      description: "Some random text",
      priority: 7,
      user_id: user.id,
      due_date: 2.days.from_now
    )
  end

  it "should be valid" do
    expect(@task).to be_valid
  end

  describe "title validation" do
    
    it "should be invalid if not presented" do
      @task.title = nil
      expect(@task).to_not be_valid
    end

    it "should be invalid if blank" do
      @task.title = "       "
      expect(@task).to_not be_valid
    end

    it "should be invalid if longer than 255" do
      @task.title = "a"*256
      expect(@task).to_not be_valid
    end

  end

  describe "priority validation" do

    it "should be valid if 0" do
      @task.priority = 0
      expect(@task).to be_valid
    end

    it "should be valid if 10" do 
      @task.priority = 10
      expect(@task).to be_valid
    end

    it "should be invalid without" do
      @task.priority = nil
      expect(@task).to_not be_valid
    end

    it "should be invalid if less then 0" do
      @task.priority = -1
      expect(@task).to_not be_valid
    end

    it "should be invalid if greater than 10" do
      @task.priority = 11
      expect(@task).to_not be_valid
    end

  end

  describe "user_id validation" do
    it "shoul not be valid without user_id" do
      @task.user_id = nil
      expect(@task).to_not be_valid
    end
  end
  
  describe "due_date validation" do

    it "should be invalid if in past" do
      @task.due_date = 2.day.ago
      expect(@task).to_not be_valid
    end

  end

end
