# Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend'
Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend', secure: Rails.env.production?
