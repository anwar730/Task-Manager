# Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend'
Rails.application.config.session_store :cookie_store, key: 'TaskmanagerBackend',domain: :all,same_site: :none,secure: true
