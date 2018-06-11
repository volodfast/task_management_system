require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
    render_views

    describe "GET #about" do
        it "should render the about page" do
            get :about
            expect(response).to have_http_status(:success)
        end
    end

    describe "GET #help" do
        it "should render the help page" do
            get :help
            expect(response).to have_http_status(:success)
        end
    end

    describe "GET #contact" do
        it "should render the contact page" do
            get :contact
            expect(response).to have_http_status(:success)
        end
    end
end
