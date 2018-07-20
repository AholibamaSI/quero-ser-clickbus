class Sim < ApplicationRecord
  has_one :handset

  ####### Model validations #########
  
  # Sim code validations
  validates :sim_code, presence: { 
    message: "Código sim no puede estar en blanco" 
  }
  validates :sim_code, length: { 
    minimum: 20, 
    maximum: 20, 
    message: "Código sim debe tener 20 dígitos"
  }
  validates :sim_code, uniqueness: {
    message: "Código sim debe ser único o ya se registró"
  }
  validates :sim_code, format: {
    with: /\A[0-9\s]+\z/i, # Regex only string numbers
    message: "Código sim debe contener solo números"
  }

  # Phone number validations
  validates :phone_number, presence: { 
    message: "Número telefónico no puede estar en blanco" 
  }
  validates :phone_number, length: { 
    minimum: 10, 
    maximum: 10, 
    message: "Número telefónico debe tener 10 dígitos"
  }
  validates :phone_number, uniqueness: {
    message: "Número telefónico debe ser único o ya se registró"
  }
  validates :phone_number, format: {
    with: /\A[0-9\s]+\z/i, # Regex only string numbers
    message: "Número telefónico debe contener solo números"
  }
end
