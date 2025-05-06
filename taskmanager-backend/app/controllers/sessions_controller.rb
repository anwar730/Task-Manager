# class SessionsController < ApplicationController
#   skip_before_action :authorize, only: [:create]

#   def create
#     user = User.find_by(name: params[:name])
#     if user&.authenticate(params[:password])
#       session[:user_id] = user.id
#       puts "Session set: #{session[:user_id]}"  # Debugging session
#       render json: user
#     else
#       render json: { errors: ["Invalid username or password"] }, status: :unauthorized
#     end
#   end

#   def destroy
#     session.delete(:user_id)  # This removes the user_id from the session
#     head :no_content
#   end
# end
class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.find_by(name: params[:name])
    if user&.authenticate(params[:password])
      # Set the user_id in the session as before
      session[:user_id] = user.id
      puts "Session set: #{session[:user_id]}"  # Debugging session
      
      # Make sure cookies reach the frontend
      cookies[Rails.application.config.session_options[:key]] = {
        value: cookies[Rails.application.config.session_options[:key]],
        same_site: :none,
        secure: true
      }
      
      render json: user
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)  # This removes the user_id from the session
    head :no_content
  end
end