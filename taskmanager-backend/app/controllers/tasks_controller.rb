class TasksController < ApplicationController
  before_action :authorize, only: [:index, :show, :create, :update, :destroy]
  before_action :set_user
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /users/:user_id/tasks
  def index
    tasks = @user.tasks
    render json: tasks
  end

  # GET /users/:user_id/tasks/:id
  def show
    render json: @task
  end

  # POST /users/:user_id/tasks
  def create
    @task = @user.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: { error: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /users/:user_id/tasks/:id
  def update
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: { error: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/tasks/:id
  def destroy
    @task.destroy
    render json: { message: 'Task deleted successfully' }, status: :ok
  end

  private

  # Set user from user_id parameter
  def set_user
    @user = User.find_by(id: params[:user_id])
    render json: { error: 'User not found' }, status: :not_found unless @user
  end

  # Set task from task ID and ensure it belongs to the current user
  def set_task
    @task = @user.tasks.find_by(id: params[:id])
    render json: { error: 'Task not found or does not belong to this user' }, status: :not_found unless @task
  end

  # Strong parameters for task
  def task_params
    params.require(:task).permit(:title, :description, :completed, :due_date)
  end
end
