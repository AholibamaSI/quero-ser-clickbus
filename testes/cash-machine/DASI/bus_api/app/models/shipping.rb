class Shipping < ApplicationRecord
  has_many :packages
  belongs_to :entity
  mount_uploader :photo_evidence, PhotoEvidenceUploader
end
