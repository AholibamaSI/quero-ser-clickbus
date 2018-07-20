class SimsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_sim, only: [:show, :update, :destroy]

  # GET /sims
  def index
    sims = Sim.all
    render json: sims, each_serializer: SimSerializer, status: :ok
  end

  # POST /sims
  def create
    Sim.transaction do
      @sim = Sim.new sim_params
      if @sim.save
        render json: @sim, serializer: SimSerializer, status: :created
      else
        render json: { message: @sim.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # POST /sims/1
  def show
    render json: @sim, serializer: SimSerializer, status: :ok
  end

  # PUT /sims/1
  def update
    Sim.transaction do
      if @sim.update sim_params
        render json: @sim, serializer: SimSerializer, status: :ok
      else
        render json: { message: @sim.errors }, serializer: SimSerializer, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # DELETE /sims/1
  def destroy
    Sim.transaction do
      if @sim.destroy
        render json: { message: "Sim eliminada" }, status: :ok
      else
        render json: { message: @sim.errors }, serializer: SimSerializer, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # GET /sims/search
  # def search
  #   key = params.keys.map(&:to_sym).first    
  #   sim = Sim.find_by(key => params[key]) unless key.nil? 
  #   if sim
  #     render json: sim, serializer: SimSerializer, status: :ok
  #   else
  #     render json: { message: "Código de sim no registrado" }, status: :ok
  #   end
  # end

  private

  def set_sim
    @sim = Sim.find(params[:id])
  end

  def sim_params
    params.require(:sims).permit(:sim_code, :phone_number)
  end
end