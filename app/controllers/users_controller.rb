class UsersController < ApplicationController

    def index

    end

    def show
        @user = User.find(params[:id])
    end

    def create
        @user = User.create(user_params)
        if @user.save
            log_in @user
            flash[:success] = "Welcome to the Task Management System!"
            redirect_to @user
        else
            render 'new'
        end
    end

    def new
        @user = User.new
    end

    private 

        def user_params
            params.require(:user).permit(:first_name, :last_name, 
                                        :email, :password, :password_confirmation)
        end
end
