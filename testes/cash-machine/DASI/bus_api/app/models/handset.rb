class Handset < ApplicationRecord
  belongs_to :sim
  belongs_to :package
  belongs_to :handset_rack
  has_many :handset_rack_positions
  has_many :links
  auto_increment :sequential_number, scope: :id
  # FEATURE, remember add handset stage enum
end
