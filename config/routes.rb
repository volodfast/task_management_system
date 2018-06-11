Rails.application.routes.draw do
  root to: 'users#show'

  get '/main', to: 'static_pages#main'
  get '/about', to: 'static_pages#about'
  get '/contact', to: 'static_pages#contact'
  get '/help', to: 'static_pages#help'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/delete_multiple_tasks', to: 'tasks#delete_multiple'
  put '/complete_multiple_tasks', to: 'tasks#complete_uncomplete_multiple'

  resources :users do
    resources :tasks
  end
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]
end
