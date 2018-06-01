require 'rails_helper'

feature 'home page' do
    scenario "hello" do
        visit('/')
        expect(page).to have_content("Hello from UsersController#index")
    end
end