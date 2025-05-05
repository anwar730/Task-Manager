class UsersController < ApplicationController
  before_action :authorize, only: [:me]
  before_action :set_user, only: [ :show, :update, :destroy]
  skip_before_action :authorize, only: :create


  def index
    users = User.all
    render json: users, status: :ok
  end

  def me
    render json: @current_user
  end

  def show
    render json: @user.to_json(include: :tasks)
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
