<h1 align="center">EzLogs</h1>

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<p align="center">
<img src="https://user-images.githubusercontent.com/56113566/141816399-3a712641-2821-42c7-83de-8c023fc1d359.png">
</p>

"A ***Logs analyser** for developers build on top of [elasticsearch](https://www.elastic.co/)*"

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Open Source Programs ☀ :

- [Delta Winter of Code](https://dwoc.io/organisations/6150be5f2f6db90012a31058)

- [Script Winter of Code](https://swoc.scriptindia.org/#/project)

<p align="center">
<img src="https://media-exp1.licdn.com/dms/image/C510BAQEfSxtcZtEwnA/company-logo_200_200/0/1585553290333?e=2159024400&v=beta&t=JJimqZMuOz7fteDTactv18Id1qRzhFJn-MssQvOK3Oo">
<img src="https://swoc.scriptindia.org/img/logo-1-no-label.png" width=300>
</p>

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Tech Stack 🚀 :
- 1. Django 
- 2. Django Rest Framework
- 3. React
- 4. Elastic Search
- 5. Celery & Redis

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Setup 👨‍💻:

### 1.Virtual Environment Setup :
##### For Linux :
```
$. python3 venv env 
$. source env/bin/activate
```
##### For Windows :
```
$. py -m venv env
$. env\Scripts\activate
```

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

#### 2. Installing Dependencies:

```
$. pip install wheel
$. pip install -r requirements.txt
```

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

#### 3. Create Database Tables and Superuser:

```
Note: For Windows Users Replace python3 with python

$. cd core/
$. python3 manage.py makemigrations
$. python3 manage.py migrate
$. python3 manage.py createsuperuser
```
![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


### 4. Install Redis and Start Server

```
$. sudo apt-get install redis-server

$. sudo service redis-server start
```
- `[Options: {start|stop|restart|force-reload|status}]`

##### For Windows Users : 

Refer This Article : https://dev.to/divshekhar/how-to-install-redis-on-windows-10-3e99

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 5. Running Celery


`$. celery -A core worker -l INFO`


##### For Windows Users : 
 https://stackoverflow.com/questions/37255548/how-to-run-celery-on-windows

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 6. Run Server

```
$. python3 manage.py runserver
```

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 8. Run Frontend 

```
cd frontend/
npm i
npm run start
```

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 9. Go Live :
- Now goto http://localhost:3000/ to test and run ezLogger.

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### API Endpoints :
 - http://localhost:8000/api/document/ *(For Uploading New Log File, METHOD = GET/POST)*
 - http://localhost:8000/api/get-some-log-lines/<FILE_ID>/    *(For getting first 'N' lines from recent uploaded log, METHOD = GET)*
 - http://localhost:8000/api/search/?q=<SEARCH_QUERY>&file_id=<File_ID> *(For getting search result based upon user search query, METHOD = GET/POST)*

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Want To Contribute ? 🙋

#### See Ideas List [here](https://github.com/Aryamanz29/Elastic-CFC/issues/17)

<h2 align="center"> ✨ CONTRIBUTORS ✨</h2>

<p align="center">

 <a href="https://github.com/Aryamanz29/Elastic-CFC/graphs/contributors">
 <img src="https://contrib.rocks/image?repo=Aryamanz29/Elastic-CFC" /></a>
</p>

![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Working Screenshots 🕵 :


![Screenshot from 2021-11-14 16-10-04](https://user-images.githubusercontent.com/56113566/141829180-a6725a51-9491-43b3-abd2-c23d742b9339.png)

### Search Results `sample-log.log` :

![Screenshot from 2021-11-14 16-13-59](https://user-images.githubusercontent.com/56113566/141829191-74631aa9-1542-4b3c-af66-7c90a8538e91.png)

### Sample log file `sample-log.log` :

![Screenshot from 2021-11-14 16-14-04](https://user-images.githubusercontent.com/56113566/141829196-620f3297-961c-469e-9754-f5639aa1a85d.png)


![-------------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)