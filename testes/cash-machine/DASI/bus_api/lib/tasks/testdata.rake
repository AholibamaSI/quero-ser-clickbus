namespace :testdata do  
  class Array
    include ProgressBar::WithProgress
  end
  desc "Load users data"
  task users: :environment do
    p 'creating testing user admin...'
    User.create(name: "Administrador", last_name: "Soto", username: "admin", 
      email: "dsotoib@gmail.com", password: "12345678", password_confirmation: "12345678",
      uid: "admin", provider: "username")
    p 'done!'

  end
  
end