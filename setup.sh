#!/bin/bash

echo "Setting up server"
echo "Searching for python3 executable..."

python_names=("python3", "python", "py3", "py")
found_version=0

for python_exe in "${python_names[@]}"; do
    echo "Checking for $python_exe in path"

    if command -v "$python_exe" >/dev/null 2>&1; then
        # Check if python version >= 3.7.0
        version=$(python3 -c "import sys; print(int(sys.version_info >= (3, 7, 0)))" 2>&1)
        if [ "$version" -eq 1 ]; then
            found_version=1
            break
        fi
    fi
done

if [ "$found_version" -eq 1 ]; then
    echo "Found python 3.7 or greater in path!"
    if [ ! -d "venv" ]; then
        echo "Creating virtual environment."

        if ! dpkg -l | grep -q "python3-venv"; then
          echo "Installing python3-venv..."
          sudo apt-get install python3-venv
        fi

        "$python_exe" -m venv venv
    fi

    echo "Enabling virtual environment"
    source venv/bin/activate

    echo "Installing requirements"
    pip install -r requirements.txt

    echo "Creating flask secret"
    if [ -f "FLASK_SECRET.key" ]; then
        echo "Flask secret already exists, not generating..."
    else
        echo "Generating a flask secret"
        python -c "import os;print(os.urandom(32))" > FLASK_SECRET.key
    fi

    echo "Installing NPM packages."
    cd static
    npm install
    cd ..

    echo "Finished setting up, you can now run the server."
else
    echo "Couldn't find a valid version of python3.7 or greater, are you sure that it's in the path?"
fi