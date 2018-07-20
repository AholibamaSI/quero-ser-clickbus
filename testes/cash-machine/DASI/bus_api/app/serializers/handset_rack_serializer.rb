class HandsetRackSerializer < ActiveModel::Serializer
    attributes :id, :barcode, :rack_type, :stage
end