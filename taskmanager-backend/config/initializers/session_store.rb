Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend',
same_site: :none,
secure: Rails.env.production?
