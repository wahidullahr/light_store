#!/bin/bash

# Script to check Docker status on macOS

echo "🐳 Checking Docker status..."

# Check if Docker command exists
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed or not in PATH"
    echo "💡 To install Docker, run: ./docker-setup.sh"
    exit 1
fi

echo "✅ Docker command found"
echo "🐳 Docker version: $(docker --version)"

# Check if Docker daemon is running
echo "🔍 Checking Docker daemon status..."
if docker info &> /dev/null
then
    echo "✅ Docker daemon is running"
    
    # Show some basic info
    echo "📊 Docker info:"
    echo "   Containers: $(docker info --format '{{.Containers}}')"
    echo "   Images: $(docker info --format '{{.Images}}')"
    echo "   Server Version: $(docker info --format '{{.ServerVersion}}')"
    
    # Check if Docker Desktop is running (macOS specific)
    if pgrep -q Docker
    then
        echo "✅ Docker Desktop process is running"
    else
        echo "⚠️  Docker Desktop process is not running"
        echo "💡 Try running: ./open-docker.sh"
    fi
else
    echo "❌ Docker daemon is not running"
    echo "💡 Docker Desktop may not be started"
    echo "💡 Try running: ./open-docker.sh"
    exit 1
fi

# Check Docker Compose
echo "🔍 Checking Docker Compose..."
if command -v docker-compose &> /dev/null
then
    echo "✅ Docker Compose found"
    echo "🐳 Docker Compose version: $(docker-compose --version)"
else
    echo "❌ Docker Compose not found"
    echo "💡 Install with: brew install docker-compose"
fi

echo "
✅ Docker environment check completed!
💡 Ready to use Docker with the Nordlys Trelys project
"