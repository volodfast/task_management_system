class UsersController < ApplicationController
    before_action :logged_in_user, only: [:edit, :update, :destroy, :show]
    before_action :show_page_as_root, only: [:show]
    before_action :correct_user, only: [:edit, :update, :show]
    before_action :admin_user, only: :destroy

    def index
        @users = User.paginate(page: params[:page])
    end

    def show
        @user = User.find(params[:id])
        @active_tasks = @user.tasks.where(active: true)
        @finished_tasks = @user.tasks.where(active: false)
        @tasks = @user.tasks
    end

    def create
        @user = User.create(user_params)
        if @user.save
            UserMailer.account_activation(@user).deliver_now
            flash[:success] = "Please check your email to activate your account"
            redirect_to main_path
        else
            render 'new'
        end
    end

    def new
        @user = User.new
    end

    def edit
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
            flash[:success] = "Profile updated"
            redirect_to @user
        else
            render 'edit'
        end
    end

    def destroy
        User.find(params[:id]).destroy
        flash[:success] = "User deleted!"
        redirect_to users_url
    end

    private 

        # Permits only specified fields
        def user_params
            params.require(:user).permit(:first_name, :last_name, 
                                        :email, :password, :password_confirmation)
        end
   
        # Confirms a logged in user
        def logged_in_user
            unless logged_in?
                store_location
                flash[:danger] = "Please Log In!"
                redirect_to login_url
            end
        end

        # Confirms the correct user
        def correct_user
            @user = User.find_by(id: params[:id])
            redirect_to root_url unless current_user?(@user)
        end

        # Confirms an admin
        def admin_user
            redirect_to(root_url) unless current_user.admin?
        end

        # If show action used from root route set params[:id] as session[:user_id]
        def show_page_as_root
            if !params[:id]
                params[:id] = session[:user_id]
            end
        end
end
