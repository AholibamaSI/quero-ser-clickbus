class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    users = User.all
    render json: users, each_serializer: UserSerializer, status: :ok
  end

  # POST /users
  def create
    User.transaction do
      @user = User.new user_params
      if @user.save
        render json: @user, serializer: UserSerializer, status: :created
      else
        render json: { message: @user.errors }, status: :unprocessable_entity
      end 
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # GET /users/1
  def show
    render json: @user, serializer: UserSerializer, status: :ok
  end

  # PUT /users/1
  def update
    User.transaction do
      if @user.update user_params
        render json: @user, serializer: UserSerializer, status: :ok
      else
        render json: { message: @user.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  # DELETE /users/1
  def destroy
    User.transaction do
      if @user.destroy
        render json: { message: "Usuario eliminado" }, status: :ok
      else
        render json: { message: @user.errors }, status: :unprocessable_entity
      end
    end
  rescue error
    render json: { message: error }, status: :unprocessable_entity
  end

  private
  
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:users).permit(:username, :password, :password_confirmation,
    :uid)
  end
end