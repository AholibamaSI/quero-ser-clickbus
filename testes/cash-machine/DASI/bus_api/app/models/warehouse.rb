class Warehouse < ApplicationRecord
  has_ancestry
  enum warehouse_type: [:warehouse, :shelf, :level, :container]
end
