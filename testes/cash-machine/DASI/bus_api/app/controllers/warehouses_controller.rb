class WarehousesController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_warehouse, only: [:show, :update, :destroy, :create_childrens]

  # GET /warehouses
  def index
    warehouses = Warehouse.all
    render json: warehouses, each_serializer: WarehouseSerializer, status: :ok
  end

  # POST /warehouses
  def create
    Warehouse.transaction do
      @warehouse = Warehouse.new warehouse_params      
      if @warehouse.save
        render json: @warehouse, serializer: WarehouseSerializer, status: :created
      else
        render json: { message: @warehouse.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # GET /warehouses/1
  def show
    render json: @warehouse, serializer: WarehouseSerializer, status: :ok
  end

  # PUT /warehouses/1
  def update
    Warehouse.transaction do
      if @warehouse.update warehouse_params
        render json: @warehouse, serializer: WarehouseSerializer, status: :ok
      else
        render json: { message: @warehouse.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # DELETE /warehouses/1
  def destroy
    Warehouse.transaction do
      if @warehouse.destroy
        render json: { message: "Warehouse eliminado" }, status: :ok
      else
        render json: { message: @warehouse.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # POST /warehouses/1/create_childrens
  def create_childrens
    I18n.locale = :es
    Warehouse.transaction do
      unless Warehouse.exists?(name: warehouse_params[:name],
        warehouse_type: warehouse_params[:warehouse_type])
        if @warehouse.warehouse_type == warehouse_params[:warehouse_type]
          children = @warehouse.children.create warehouse_params
          render json: children, status: :ok
        else
          # Exception in case the node type of the tree are not equal
          render json: { 
            message: "Nodo a insertar: #{I18n.t warehouse_params[:warehouse_type]} no es compatible con el nodo actual: #{I18n.t @warehouse.warehouse_type}"
          }, status: :unprocessable_entity
        end
      else         
        render json: { message: "#{I18n.t warehouse_params[:warehouse_type]} #{warehouse_params[:name]} ya está registrado"},
              status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  private 

  def set_warehouse
    @warehouse = Warehouse.find(params[:id])
  end

  def warehouse_params
    params.require(:warehouses).permit(:name, :warehouse_type)
  end

end