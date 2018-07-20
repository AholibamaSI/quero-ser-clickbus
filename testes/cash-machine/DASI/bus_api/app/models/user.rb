class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :recoverable,
         :trackable, :validatable, :registerable,
         authentication_keys: [:email, :username]
  attr_accessor :skip_username_validation, :skip_email_validation,
         :skip_password_validation, :skip_password_confirmation_validation,
         :skip_uid_validation
  include DeviseTokenAuth::Concerns::User
  # Users roles
  enum role: [:operator, :admin, :super_admin]
  ####### Model validations #########

  # Username validations
  validates :username, presence: { 
    message: "Usuario no puede estar en blanco" 
  }, unless: :skip_username_validation

  validates :username, uniqueness: {
    case_sensitive: true,
    message: "Usuario debe ser único o ya se registró"
  }

  # Email validations
  validates :email, presence: { 
    message: "Email no puede estar en blanco" 
  }, unless: :skip_email_validation

  validates :email, uniqueness: {
    case_sensitive: true,
    message: "Email debe ser único o ya se registró"
  }

  # Password validations
  validates :password, presence: { 
    message: "Contraseña no puede estar en blanco"
  }, unless: :skip_password_validation

  validates :password_confirmation, presence: {
    message: "Confirmación de contraseña no puede estar en blanco"
  }, unless: :skip_password_confirmation_validation

  # UID validations
  validates :uid, presence: { 
    message: "UID no puede estar en blanco.\
    Se recomienda inserta en este campo el 'username'"
  }, unless: :skip_uid_validation
end
