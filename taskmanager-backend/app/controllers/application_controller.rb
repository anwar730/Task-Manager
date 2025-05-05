class ApplicationController < ActionController::API
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
