Rails.application.routes.draw do

  resources :handsets
  resources :handset_racks do
    post 'create_childrens', on: :member
  end
  resources :shelves
  resources :shelf_handset_racks
  resources :sims do
    get 'search', on: :collection
  end
  resources :warehouses do
    post 'create_childrens', on: :member
  end
  resources :shippings do
    post :add_evidence, on: :member
    get :generate_report, on: :collection
  end
  resources :networks do
    post 'network_file', on: :member
  end

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    sessions: 'sessions'
  }
end
