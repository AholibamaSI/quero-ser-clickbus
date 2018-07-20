class NetworkFile < ApplicationRecord
	belongs_to :network
	mount_uploader :file, NetworkFileUploader

  def file_name
    self.file_identifier
  end
end
