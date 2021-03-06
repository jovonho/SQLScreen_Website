# TMXScreen Web Interface

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
Set-up environment variable to development to enable hot reloading (view changes in web page without relaunching flask). 

Depending on which shell you're using it's done differently. In VSCode integrated windows powershell it's `$env:FLASK_ENV="development"`, on windows cmd it's `set FLASK_ENV=development` on bash it's `FLASK_ENV=development`.

Now launch the server with `flask run`. Or if that doesn't work `py -m flask run`. You should see `* Environment: development`.

Navigate to `localhost:5000`.