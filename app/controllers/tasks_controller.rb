class TasksController < ApplicationController
    before_action :logged_in_user
    before_action :correct_user

    def show
        @user = User.find(params[:user_id])
        @task = @user.tasks.find(params[:id])
    end

    def edit
        @user = User.find(params[:user_id])
        @task = @user.tasks.find(params[:id])
    end

    def new
        @user = current_user
        @task = Task.new
    end

    def create
        @task = current_user.tasks.build(task_params)
        if @task.save
            flash[:success] = "Task has been created!"
            redirect_to root_url
        else
            render 'new'
        end
    end

    def destroy
        task = current_user.tasks.find_by(id: params[:id])
        task.destroy
        flash[:success] = "Task was deleted!"
        redirect_to root_url
    end

    private

        def task_params
            params.require(:task).permit(:title, :priority, :due_date, :description)
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
            user = User.find(params[:user_id])
            unless current_user?(user)
                flash[:danger] = "You are not allowed to view, modify or destroy another users task!"
                redirect_to root_url 
            end
        end
end
