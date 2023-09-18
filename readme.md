# APhysicsWeb

## About:
[APhysics Web](https://github.com/quintindunn/APhysicsWeb) is a project to help learn APhysics 1. It (will) consist of calculators, simulators, and general documentation.

## Create Local Version:

### Prerequisites:
**(The versions are what the project is tested on, lower versions may still work, older version too may not work)**
* Python v3.11.1
* Pip v22.3.1 

## Installation:

### Installation (Manual-Windows):
1. Clone the repository: `git clone https://github.com/quintindunn/APhysicsWeb.git APhysicsWeb`
2. `cd` into the repository `cd ./APhysicsWeb`
3. Create a virtual environment `python3 -m venv venv`
4. Activate the virtual environment `call venv/Scripts/activate`
5. Install the requirements `pip install -r requirements.txt`
6. Run the server: `python3 app.py`
* To run the server after closing your terminal you will have to reactivate the virtual environment*

### Installation (Automatic-Windows):
1. Clone the repository: `git clone https://github.com/quintindunn/APhysicsWeb.git APhysicsWeb`
2. `cd` into the repository `cd ./APhysicsWeb`
3. Run `setup.bat`

### Installation (Manual-Unix):
1. Clone the repository: `git clone https://github.com/quintindunn/APhysicsWeb.git APhysicsWeb`
2. `cd` into the repository `cd ./APhysicsWeb`
3. Create a virtual environment `python3 -m venv venv`
4. Activate the virtual environment `source ./venv/bin/activate`
5. Install the requirements `pip install -r ./requirements.txt`
6. Run the server: `python3 app.py`
* To run the server after closing your terminal you will have to reactivate the virtual environment*

### Installation (Automatic-Unix):
1. Clone the repository: `git clone https://github.com/quintindunn/APhysicsWeb.git APhysicsWeb`
2. `cd` into the repository `cd ./APhysicsWeb`
3. Change `./setup.sh` to executable mode `chmod +x ./setup.sh`
4. Run `setup.sh`


## Running the server:

### Running the server (Windows)
1. Run `run.bat`

### Running the server (Unix):
1. Change `./run.sh` to executable mode `chmod +x ./run.sh`
2. Run `./run.sh`


## Contributing:
* As the project is currently at the initial commits the conventions used aren't yet outlined, try to follow the syntax used. In the future this will be outlined. A general rule of thumb is to follow common conventions such as [PEP-8](https://peps.python.org/pep-0008/). Before merging, the code will be checked with PyLint for a basic lint.