# Let's Train

## Postgres setup for MAC:

- `brew install postgres`

- `psql postgres`

- `create role admin with login password '1234';`

- `\q`

- `psql postgres -U admin`

- `create database training;`

- `GRANT ALL PRIVILEGES ON DATABASE training TO admin;`

## Backend setup:

- Go to lets_train_backend
- virtualenv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

## Frontend setup:

- Go to lets_train_ui
- npm install
- npm start

## Creating admin user:

- Comment authentication in *lets_train_backend/api_app/views.py*

`	# authentication_classes = (TokenAuthentication,)`

`	# permission_classes = (IsAdminOrReadOnly, )`


- **URL**: localhost:8000/api/user/

- **POST**:
 [{
 
 "username":"admin",
 
 "first_name":"admin",
 
 "last_name":"",
 
 "email":"admin@localhost.com",
 
 "password":"1234",
 
 "userprofile":{
  	  "employee_code":"00000"
  },
 
 "is_staff": true

}]

- Uncomment authentication in *lets_train_backend/api_app/views.py*

- *Go to localhost:3000/admin/ on your browser.*
