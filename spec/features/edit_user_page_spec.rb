require 'rails_helper'

feature 'edit user page' do
    
    scenario "should not update with blank name" do
   
        visit('/')
        click_link 'Sign Up'
        fill_in 'user_first_name', with: 'FirstName'
        fill_in 'user_last_name', with: 'LastName'
        fill_in 'user_email', with: 'someemail@example.com'
        fill_in 'user_password', with: 'password'
        fill_in 'user_password_confirmation', with: 'password'
        click_button 'Create account'
        click_link 'Settings'

        fill_in 'user_first_name', with: ''
        click_button 'Save changes'
        expect(page).to have_content('The form contains')
   
    end
end