Rails.application.routes.draw do
  resources :users
  resources :pictures
  resources :moons
  resources :planets
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
