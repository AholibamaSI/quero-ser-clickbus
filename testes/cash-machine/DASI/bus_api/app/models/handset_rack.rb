class HandsetRack < ApplicationRecord
  has_many :handsets
  has_ancestry
  
  enum stage: [:deactivate, :activate]
  enum rack_type: [:rack, :position]

  # Remember add model validations
end
