class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  
  # If you want CSRF protection (recommended for cookies/sessions)
  protect_from_forgery with: :exception
  before_action :authorize
  
  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    if @current_user.nil?
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    else
      puts "Current User: #{@current_user.name}"  # Debugging line to confirm current user
    end
  end
end
