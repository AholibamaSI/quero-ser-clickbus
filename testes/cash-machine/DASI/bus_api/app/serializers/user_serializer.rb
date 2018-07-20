class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :last_name, :email,
            :role, :image
end