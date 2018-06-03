require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    fixtures :all

    describe "edit route" do
        let(:user) { User.create(   first_name: "Fname",
                                    last_name: "Lname",
                                    email: "randemail@example.com",
                                    password: "password",
                                    password_confirmation: "password",
                                    ) }

        it "should redirect to login if the user is not logged in" do
            get :edit, params: { id: user.id }
            expect(response).to redirect_to login_path
        end

    end
end
