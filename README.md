# Elastic-CFC
EzLogs 📝

## Setup:

### Virtual Environment Setup :
#### For Linux :
```
$python3 venv env 
$source env/bin/activate
```
#### For Windows :
```
$py -m venv env
$env/Scripts/activate
```
#### Intalling Deps:

```
$pip install -r requirements.txt
```
#### Create Database Tables and Superuser:

```
Note: For Windows Replace python3 with py or python

cd core/
$python3 manage.py makemigrations
$python3 manage.py migrate
$python3 manage.py createsuperuser
```

### Running Celery

`celery -A core worker -l INFO`