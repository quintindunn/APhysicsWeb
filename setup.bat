@echo off
setlocal enabledelayedexpansion

echo Setting up server
echo Searching for python3 executable...

set "python_names=python3"

set found_version=0

for %%i in (%python_names%) do (
    set "python_exe=%%i"
    echo Checking for !python_exe! in path

    where !python_exe! 2>nul
    :: Found a executable at that path.
    if !errorlevel! == 0 (
        :: Check if python version >= 3.5.0
        for /f %%v in ('python3 -c "import sys; print(int(sys.version_info >= (3, 5, 0)))" 2^>^&1') do set version=%%v
            if !version! == 1 (
                goto FOUND_PYTHON
            )
    )
)

:FOUND_PYTHON
if !version! == 1 (
    echo Found python 3.5 or greater in path!
    if not exist venv (
        echo Creating virtual environment.
        %python_exe% -m venv venv
    )
    echo Enabling virtual environment
    call venv/Scripts/activate
    echo Installing requirements
    pip install -r requirements.txt

    echo Creating flask secret
    if exist "FLASK_SECRET.key" (
        echo Flask secret already exists, not generating...
    ) else (
        echo Generating a flask secret
        python -c "import os;print(os.urandom(32))" > FLASK_SECRET.key
    )

    echo Finished setting up, you can now run the server by running run.bat
) else (
    echo Couldn't find a valid version of python3.5 or greater, are you sure that it's in the path?
)