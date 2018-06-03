require 'rails_helper'

feature 'home page' do
    scenario "hello" do
        visit('/')
        expect(page).to have_http_status(:success)
    end
end