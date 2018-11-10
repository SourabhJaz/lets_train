# lets_train

WIP

Postgres setup for MAC:

brew install postgres
create role admin with login password '1234';
psql postgres -U admin
create database training;
GRANT ALL PRIVILEGES ON DATABASE training TO admin;

Backend setup:

Go to lets_train_backend
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

Frontend setup:

Go to lets_train_ui
npm install
npm start

Create admin user:
localhost:8000/api/user/
POST:
 [{
  "username":"00000",
  "first_name":"admin",
  "last_name":"",
  "email":"admin@localhost.com",
  "password":"1234",
  "userprofile":{
  	  "employee_code":"00000"
  },
  "is_staff": true
}]

Go to localhost:3000/admin/ on your browser