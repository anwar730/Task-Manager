# # Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend'
# Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend',domain: :all,same_site: :none,secure: true
# config/initializers/session_store.rb
Rails.application.config.session_store :cookie_store, 
  key: '_task_manager_session',
  same_site: :none,
  secure: true,
  http_only: true