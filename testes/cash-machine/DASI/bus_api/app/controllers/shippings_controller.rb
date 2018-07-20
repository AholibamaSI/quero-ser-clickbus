class ShippingsController < ApplicationController
  include GenerateXlsx
  before_action :authenticate_user!
  before_action :set_shipping, only: [:show, :add_evidence]

  # GET /shippings
  def index
    shippings = Shipping.where(entity_id: current_user.entity_id)
    render json: shippings, each_serializer: ShippingSerializer, status: :ok
  end

  def show
    render json: @shipping, serializer: ShippingSerializer, status: :ok
  end

  def add_evidence
    params[:shipping][:stage] = 1
    params[:shipping][:reception_date] = DateTime.now
    Shipping.transaction do
      if @shipping.update shipping_params
        @shipping.packages.each do |package|
          package.update(stage: 2)
          package.handsets.each do |handset|
            handset.update(stage: 6)
            Link.create(imei: handset.imei, barcode: handset.barcode, handset_id: handset.id, user_id: current_user.id, link_type: 6)
          end
        end
        render json: @shipping, serializer: ShippingSerializer, status: :ok
      else
        render json: { message: @shipping.errors }, status: :unprocessable_entity
      end
    end
  rescue Exception => error
    render json: { message: error }, status: :unprocessable_entity
  end

  def generate_report
    init_report(params)
    send_file "#{Rails.root}/reporte_de_#{params[:title]}.xlsx", type: 'application/xlsx', disposition: 'attachment'
  end

  private
  def set_shipping
    @shipping = Shipping.find(params[:id])
  end

  def shipping_params
    params.require(:shipping).permit(:lat, :lng, :photo_evidence, :stage, :reception_date)
  end
end
