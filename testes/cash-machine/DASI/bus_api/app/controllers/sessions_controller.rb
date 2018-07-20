class SessionsController < DeviseTokenAuth::SessionsController

  # POST auth/sign_in
  def create
    key = (resource_params.keys.map(&:to_sym) & resource_class.authentication_keys).first
    if key
      # find user by params key [:email, :username], when email is present. It is taken as default 
      user = User.find_by(key => resource_params[key])
      # create client id & token
      token = SecureRandom.urlsafe_base64(nil, false)        
      client_id = SecureRandom.urlsafe_base64(nil, false)
      if user && user.valid_password?(resource_params[:password])
        user.tokens[client_id] = { 
          token: BCrypt::Password.create(token), 
          expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i 
        }
        user.skip_email_validation = true
        user.skip_username_validation = true
        user.skip_password_validation = true
        user.skip_password_confirmation_validation = true
        user.skip_uid_validation = true
        user.save
        # tells you to devise that the user is logging in        
        sign_in(:user, user, store: false, bypass: false)
        # send token auth headers to client
        response.headers.merge! user.create_new_auth_token(client_id)          
        render json: user, serializer: UserSerializer, status: :created
      else
        render_create_error_bad_credentials
      end    
    else
      render_create_error_bad_credentials
    end  
  end

  def destroy
  end
end