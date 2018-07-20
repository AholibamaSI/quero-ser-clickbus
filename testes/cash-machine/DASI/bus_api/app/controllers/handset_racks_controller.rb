class HandsetRacksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_handset_rack, only: [:show, :update, :destroy, :create_childrens]

  # GET /handset_racks
  def index
    handset_racks = HandsetRack.all
    render json: handset_racks, each_serializer: HandsetRackSerializer, status: :ok
  end

  # POST /handset_racks
  def create
    HandsetRack.transaction do
      @handset_rack = HandsetRack.new handset_rack_params
      if @handset_rack.save
        render json: @handset_rack, serializer: HandsetRackSerializer, status: :created
      else
        render json: { message: @handset_rack.errors }, status: :unprocessable_entity
      end
    end
  rescue Exception => error
    render json: { message: error }, status: :unprocessable_entity
  end

  # GET /handset_racks/1
  def show
    render json: @handset_rack, serializer: HandsetRackSerializer, status: :ok
  end

  # PUT /handset_racks/1
  def update
    HandsetRack.transaction do
      if @handset_rack.update handset_rack_params
        render json: @handset_rack, serializer: HandsetRackSerializer, status: :ok
      else
        render json: { message: @handset_rack.errors }, status: :unprocessable_entity
      end
    end
  rescue Exception => error
    render json: { message: error }, status: :unprocessable_entity
  end

  # DELETE /handset_racks/1
  def destroy
    HandsetRack.transaction do
      if @handset_rack.destroy
        render json: { message: "HandsetRack eliminado" }, status: :ok
      else
        render json: { message: @handset_rack.errors }, status: :unprocessable_entity
      end
    end
  rescue Exception => error
    render json: { message: error }, status: :unprocessable_entity
  end

  # POST /handset_racks/1/create_childrens
  def create_childrens
    I18n.locale = :es
    HandsetRack.transaction do
      unless HandsetRack.exists?(barcode: handset_rack_params[:barcode], rack_type: handset_rack_params[:rack_type])
        if @handset_rack.rack? && handset_rack_params[:rack_type] == 'position'
          children = @handset_rack.children.create handset_rack_params
          render json: children, status: :ok
        else
          # Exception in case the node type of the tree are not equal
          render json: { 
            message: "Nodo a insertar: #{I18n.t handset_rack_params[:rack_type]} no es compatible con el nodo padre: #{I18n.t @handset_rack.rack_type}"
          }, status: :unprocessable_entity
        end
      else
        render json: { message: "#{I18n.t handset_rack_params[:rack_type]} #{handset_rack_params[:barcode]} ya está registrado"},
              status: :unprocessable_entity        
      end
    end
  end

  private 

  def set_handset_rack
    @handset_rack = HandsetRack.find(params[:id])
  end

  def handset_rack_params
    params.require(:handset_racks).permit(:barcode, :rack_type, :stage)
  end
end