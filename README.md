05-13-19 PT Jamie Vullo JavaScript w/Rails as an API Project

# Moonlight
A web application made using the Rails framework as an API for backend and JavaScript high-level programming language for frontend. 

## Table of Contents
* Description
* Technologies
* Setup
* Resources
* License

### Description
This is a single page application that allows Users to signup and explore our Solar Systems Planets and Moons. They can also check out the NASA picture of the day, check out the International Space Station's location, and take a fun Science or Math based Quiz. 

### Technologies
This application utilizes the Ruby Programming language and JavaScript while using several gems (listed)
ruby '2.6.1'
* gem 'rails', '~> 6.0.0'
* gem 'sqlite3', '~> 1.4'
* gem 'puma', '~> 3.11'
* gem 'sass-rails', '~> 5'
* gem 'webpacker', '~> 4.0'
* gem 'turbolinks', '~> 5'
* gem 'jbuilder', '~> 2.7'
* gem 'redis', '~> 4.0'
* gem 'bcrypt'
* gem 'image_processing', '~> 1.2'
* gem 'bootsnap', '>= 1.4.2', require: false
* gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
* gem 'web-console', '>= 3.3.0'
* gem 'listen', '>= 3.0.5', '< 3.2'
* gem 'spring'
* gem 'spring-watcher-listen', '~> 2.0.0'
* gem 'capybara', '>= 2.15'
* gem 'selenium-webdriver'
* gem 'webdrivers'
* gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
* gem 'bootstrap'

### Setup
* To run this web application you must clone it from git@github.com:jamievullo/Moonlight.git goto https://github.com/jamievullo/Moonlight copy and clone into your terminal.
* On command line type: git clone git@github.com:jamievullo/Moonlight.git
* input "cd Moonlight" on command line
* input "cd backend" on command line
* Run bundle install from command line
* Run "rails db:migrate" from command line
* Run "rails db:seed" from the command line
* Run rails s from the command line
* input "cd .." on command line
* input "cd frontend" on command line
* input "open index.html" on command line to open up browser and start program
* Signup for app by creating a Username.
* Explore our Solar Systems Planets and their Moons. 

### Sources and Resources Used
* http://learn.co
* https://rubygems.org
* https://stackoverflow.com x 1000 ;)
* https://css-tricks.com
* https://developer.mozilla.org/en-US/docs/Web/JavaScript
* https://www.w3schools.com/js/default.asp
* https://fonts.google.com/specimen/Titillium+Web?selection.family=Titillium+Web
* https://api.nasa.gov/
* https://opentdb.com/api_config.php
* https://wheretheiss.at/w/developer
* https://leafletjs.com/
* http://leaflet-extras.github.io/leaflet-providers/preview/
* https://leanpub.com/leaflet-tips-and-tricks
* https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
* https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/


### License
* MIT License

### Possible Future Changes or upgrades
* Making more components that draw from NASA API's
* Styling the "all planet moons" rendering
* Adding a Sun component
* Adding Constellations component(the origin story of this project)
* Adding size comparison for Planets compared to Earth
