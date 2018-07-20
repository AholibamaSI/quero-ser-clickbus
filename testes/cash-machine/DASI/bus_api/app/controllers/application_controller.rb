class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF Attacks
  protect_from_forgery with: :null_session , unless: -> { request.format.json? }
  skip_before_filter :verify_authenticity_token
end
