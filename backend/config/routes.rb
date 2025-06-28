Rails.application.routes.draw do
  # Mount Spree's engine at the root of your application.
  mount Spree::Core::Engine, at: '/'

  # Mount MissionControl::Jobs engine at the specified path.
  mount MissionControl::Jobs::Engine, at: "/jobs"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Define the root path route ("/")
  # root "posts#index"

  # Add custom API routes for login
  namespace :api do
    namespace :v2 do
      post 'login', to: 'login#create'
    end
  end
end
