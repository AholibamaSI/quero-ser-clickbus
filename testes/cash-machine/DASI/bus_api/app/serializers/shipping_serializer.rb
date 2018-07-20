class ShippingSerializer < ActiveModel::Serializer
  attributes :id, :weight, :receiver, :shipping_date, :date_of_delivery, :tracking_number, :photo_evidence
end
