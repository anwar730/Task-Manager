class ApplicationController < ActionController::API
  # include ActionController::Cookies
  # include ActionController::RequestForgeryProtection
  
  # # If you want CSRF protection (recommended for cookies/sessions)
  # protect_from_forgery with: :null_session  # for API-only endpoints
  include ActionController::Cookies  # Important for session access
  

  before_action :authorize

  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end
  
end
