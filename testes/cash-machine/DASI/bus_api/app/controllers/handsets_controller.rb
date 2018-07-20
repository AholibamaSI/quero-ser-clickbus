class HandsetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_handset, only: [:show, :update, :destroy]

  # GET /handsets
  def index
    handsets = Handset.all
    render json: handsets, each_serializer: HandsetSerializer, status: :ok
  end

  # POST /handsets
  def create
    Hanset.transaction do
      @handset = Handset.new handset_params
      if @handset.save
        render json: @handset, serializer: HandsetSerializer, status: :created
      else
        render json: { message: @handset.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # GET /handsets/1
  def show
    render json: @handset, serializer: HandsetSerializer, status: :ok
  end

  # PUT /handsets/1
  def update
    Handset.transaction do
      if @handset.update handset_params
        render json: @handset, serializer: HandsetSerializer, status: :ok
      else
        render json: { message: @handset.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # DELETE /handsets/1
  def destroy
    Handset.transaction do
      if @handset.destroy
        render json: { message: "Handset eliminado" }, status: :ok
      else
        render json: { message: @handset.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  private 

  def set_handset
    @handset = Handset.find(params[:id])
  end

  def handset_params
    params.require(:handsets).permit(:imei, :model, :brand)
  end
end