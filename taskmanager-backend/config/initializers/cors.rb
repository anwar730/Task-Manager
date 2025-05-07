# config/initializers/cors.rb

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     # Add your frontend domains here
#     origins 'http://localhost:5173', 
#             'http://localhost:3000', 
#             'http://127.0.0.1:5173',
#             'http://127.0.0.1:3000',
#             'https://your-frontend-production-domain.com'
    
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head],
#       credentials: true,
#       expose: ['access-token', 'expiry', 'token-type', 'uid', 'client']
#   end
# end

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'https://task-manager-zeta-eight.vercel.app/' # your React app URL
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :patch, :put, :delete, :options],
#       credentials: true  # This is crucial
#   end
# end
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins  'https://task-manager-alpha-gilt.vercel.app/','http://localhost:5173/'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
