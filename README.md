# Project Name: ‘Filter search data’
 ## How to run this project :question:
  ### :point_right: First clone this repo
  ### :point_right: Then go to the `<backend>` folder and install all dependencies using pipenv file.
  ### :point_right: Run `<python manage.py makemigrations>` & `<python manage.py migrate>`.
  ### :point_right: Run `<python manage.py runserver>` to run the backend.  
  ### :point_right: Then got to the `<frontend>` folder.  
  ### :point_right: Run `<npm install>` to install all dependencies.  
  ### :point_right: Run `<yarn start>` to run frontend.  
  ### :point_right: After running the frontend, go to `localhost:3000` and then for the first time create an account, and then login.
 ## Demo:
  ### :white_check_mark: Deploy in heroku `[Full]`. [Demo](https://tanvir-filter-data.herokuapp.com/)
  ### :white_check_mark: Deploy in heroku `[Backend]`. [Demo](https://filter-data.herokuapp.com/)
 ## How use api endpoint to get data :question:
  ### :point_right: use `/all-input` to get all user input data  
  ### :point_right: use `/input/1/2021-09-03T02-20-00Z/2021-09-23T02-03-59Z` to get user input data based on `user id`, `start datetime`, `end datetime`
  :red_circle: **Note: `2021-09-03T02-20-00Z (yyyy-mm-ddThh:mm:ssZ)` uses datetime in this format for manual input.**  
  :red_circle: **Note: `/home?user=& start-date=2021-09-03T02-03-00Z&end-date=2021-09-30T02-16-00Z` give url params this format for manual input in url.**
