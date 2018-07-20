class Package < ApplicationRecord
  belongs_to :shipping
  has_many :handsets
end