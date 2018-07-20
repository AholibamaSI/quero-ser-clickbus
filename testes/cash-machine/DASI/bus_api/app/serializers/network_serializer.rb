class NetworkSerializer < ActiveModel::Serializer
  attributes :id, :network, :number_of_registers, :number_of_unique, :responsible_name, :network_files
  # has_many :network_files

  def network_files
    net_files = []
    correct_files = object.network_files.where(correct: true)
    correct_files.each do |network_file|
      nf = network_file.attributes
      nf['file_name'] = network_file.file_name
      net_files << nf
    end
    return net_files
  end
end