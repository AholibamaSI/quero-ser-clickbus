class NetworksController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_network, only: [:show, :update, :destroy]

  # GET /networks
  def index
    @networks = Network.all
    render json: @networks
  end

  # GET /networks/1
  def show
    render json: @network
  end

  # POST /networks
  def create
    @network = Network.new(network_params)

    if @network.save
      render json: @network, status: :created, location: @network
    else
      render json: @network.errors, status: :unprocessable_entity
    end
  end

  def network_file
    NetworkFile.transaction do
      @network_file =  NetworkFile.new(network_id: params[:id]  ,file: params[:network][:file])
      if @network_file.save
        begin
          np = NetworkFileParser.new network_file_path: @network_file.file.path,
            network_file: @network_file
          np.parse
        rescue Exception => e
          render json: @network_file.errors, status: :unprocessable_entity
          return
        end
        @network_file.reload
        roo = Roo::Spreadsheet.open(@network_file.file.path)
        rows = roo.sheet("Simpatizantes")
        count_errors = 0
        total_rows = ''
        rows.each_with_index do |row, row_number|
          next if row_number == 0
          if !row[11].blank?
            count_errors += 1
          end
          total_rows = row_number
        end
        if count_errors > 0
          send_file @network_file.file.path, type: 'application/xlsx', disposition: 'attachment'
        else
          nc = NetworksController.new
          nc.create_sympathizers(@network_file)
          render json: {message: "Archivo éxitoso", status: :ok}
        end
      else
        if @network_file.errors.messages[:file].include? "You are not allowed to upload \"jpeg\" files, allowed types: xls, xlsx"
          render json: { message: "El tipo de archivo no es permitido."}, status: :unprocessable_entity
        else
          render json: { message: @network_file.errors }, status: :unprocessable_entity
        end
      end
    end
  rescue Exception => error
    render json: { message: error }, status: :unprocessable_entity
  end

  def create_sympathizers network_file
    network_file.update(correct: true)
    Sympathizer.where(network_id: network_file.network_id).destroy_all
    np = NetworkFileParser.new network_file_path: network_file.file.path,
      network_file: network_file, save: true
    np.parse
  end
  # PATCH/PUT /networks/1
  def update
    if @network.update(network_params)
      render json: @network
    else
      render json: @network.errors, status: :unprocessable_entity
    end
  end

  # DELETE /networks/1
  def destroy
    @network.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_network
      @network = Network.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def network_params
      params.require(:network).permit(:network, :number_of_registers, :number_of_unique, :responsible_name)
    end
end
