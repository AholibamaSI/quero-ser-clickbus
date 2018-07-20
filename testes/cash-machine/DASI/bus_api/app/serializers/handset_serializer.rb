class HandsetSerializer < ActiveModel::Serializer
  attributes :imei, :phone_number, :model, :brand, :stage
  has_one :sim
end