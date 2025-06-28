module Api
    module V2
      class LoginController < Spree::Api::V2::BaseController
        skip_before_action :authenticate_spree_user
    
        def create
          Rails.logger.info "Login attempt with email: #{params[:email]}"
    
          email = params[:email]
          password = params[:password]
    
          user = Spree::User.find_by(email: email)
          if user&.valid_password?(password)
            Rails.logger.info "Login successful for user: #{email}"
            # Generate a token or session here
            render json: { success: true, message: 'Login successful', token: 'your-token' }, status: :ok
          else
            Rails.logger.info "Login failed for user: #{email}"
            render json: { success: false, message: 'Invalid email or password' }, status: :unauthorized
          end
        end
      end
    end
  end
  