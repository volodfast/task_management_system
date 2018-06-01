require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @subject = described_class.new(first_name: "FirstName",
                                last_name: "LastName",
                                email: "someemail@example.com",
                                password: "password",
                                password_confirmation: "password"
                              )
  end
  
  it "should be valid" do
    expect(@subject).to be_valid
  end

  describe "first_name validation" do

    it "should not be valid without first_name" do
      @subject.first_name = nil
      expect(@subject).to_not be_valid
    end

    it "should not be valid with first_name longer than 50" do
      @subject.first_name = "a"*51
      expect(@subject).to_not be_valid
    end

  end

  
  describe "last_name validation" do

    it "should not be valid without last_name" do
      @subject.last_name = nil
      expect(@subject).to_not be_valid
    end

    it "should not be valid with last_name longer than 50" do
      @subject.last_name = "a"*51
      expect(@subject).to_not be_valid
    end

  end

  
  describe "email validation" do

    it "should not be valid without email" do
      @subject.first_name = nil
      expect(@subject).to_not be_valid
    end

    it "should not be valid if email length > 255" do
      @subject.email = "a"*244 + "@example.com"
      expect(@subject).to_not be_valid
    end

    it "should not be valid if it does not follow email pattern" do
      @subject.email = "abalabadu"
      expect(@subject).to_not be_valid
    end

  end


  describe "password validation" do

    it "should not be valid without password" do
      @subject.password = nil
      @subject.password_confirmation = nil
      expect(@subject).to_not be_valid
    end

    it "should not be valid if password length < 6" do
      @subject.password = "aaaaa"
      @subject.password_confirmation = "aaaaa"
      expect(@subject).to_not be_valid
    end

    it "should not be valid if password and password_confirmation are not the same" do
      @subject.password = "aaaaaa"
      expect(@subject).to_not be_valid
    end

  end




  describe "full_name method" do
    it "should return first_name + last_name" do
      expect(@subject.full_name).to eql("FirstName LastName")
    end
  end
end
