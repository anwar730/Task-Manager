Rails.application.routes.draw do
  resources :users do
    resources :tasks
  end
  post '/login', to: 'sessions#create'  # Login route
  delete '/logout', to: 'sessions#destroy'  # Logout route
  post '/signup', to: "users#create"
  # In config/routes.rb
  get "/me", to: "users#me"
  get '/session_test', to: 'sessions#test'

end
