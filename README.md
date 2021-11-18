# TMXScreen Web Interface

![SQLScreen main pge](/app/static/resources/pics/sqlscreen.PNG)

## Installation Instructions

### Set up repo locally
`git clone https://github.com/jovonho/TmxScreen_Website.git dest`  

`git checkout -b yourbranchname`

### Create & Launch Virtual Env
`py -m venv .venv`  

`.venv/Scripts/activate`  

### Install dependencies 
`py -m pip install -r requirements.txt`

### Check Database Config
Ensure `config/db.ini` is good.

### Launch flask
The environment variables are defined in `.flaskenv` and will be created automatically. 

Now launch the server with `flask run`. Or if that doesn't work `py -m flask run`. You should see `* Environment: development`.

Navigate to `localhost:5000`.