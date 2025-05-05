class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.find_by(name: params[:name]) # Find user by name
    if user&.authenticate(params[:password]) # Check if password is correct
      session[:user_id] = user.id  # Store user_id in session
       puts "Session ID: #{session[:user_id]}"
      render json: user  # Return the user data as response
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)  # This removes the user_id from the session
    head :no_content
  end
end
