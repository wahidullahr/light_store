#!/bin/bash

# Docker Setup Script for Nordlys Trelys

echo "🐳 Setting up Docker environment for Nordlys Trelys"

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed. Installing Docker Desktop for Mac..."
    
    # Check if Homebrew is installed
    if command -v brew &> /dev/null
    then
        echo "🍺 Installing Docker Desktop using Homebrew..."
        brew install --cask docker
        echo "✅ Docker Desktop has been installed!"
        echo "💡 Please open Docker Desktop from your Applications folder and follow the setup instructions."
        echo "💡 You may need to restart your terminal after Docker Desktop is running."
    else
        echo "❌ Homebrew is not installed. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        echo "   Then run this script again."
        echo "   Or download Docker Desktop manually from: https://www.docker.com/products/docker-desktop"
        exit 1
    fi
else
    echo "✅ Docker is already installed!"
fi

# Check Docker version
if command -v docker &> /dev/null
then
    echo "🐳 Docker version: $(docker --version)"
fi

# Check if Docker Compose is installed (Docker Desktop for Mac includes Compose)
if command -v docker-compose &> /dev/null
then
    echo "✅ Docker Compose is already installed!"
    echo "🐳 Docker Compose version: $(docker-compose --version)"
else
    echo "⚠️  Docker Compose is not installed. Installing..."
    brew install docker-compose
fi

echo "
✅ Docker environment is ready!

📝 To use Docker with this project:

Development:
  ./docker-dev.sh -b     # Start development container with build

Production:
  ./docker-prod.sh -b    # Start production container with build

Stop containers:
  ./docker-dev.sh down   # Stop development containers
  ./docker-prod.sh down  # Stop production containers

View logs:
  ./docker-dev.sh logs   # View development logs
  ./docker-prod.sh logs  # View production logs
"