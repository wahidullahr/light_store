#!/bin/bash

# Simple Docker Test Script

echo "🐳 Testing Docker installation..."

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed or not in PATH"
    echo "💡 Please install Docker Desktop for Mac:"
    echo "   https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "✅ Docker is installed"
echo "🐳 Version: $(docker --version)"

# Check if Docker daemon is running
echo "🔍 Checking if Docker daemon is running..."
if docker info &> /dev/null
then
    echo "✅ Docker daemon is running"
else
    echo "⚠️  Docker daemon is not running"
    echo "💡 Please start Docker Desktop application"
    echo "💡 Wait for the Docker whale icon to appear in your menu bar"
    exit 1
fi

# Run a simple test container
echo "🧪 Running a simple test container..."
if docker run --rm hello-world &> /dev/null
then
    echo "✅ Docker is working correctly!"
    echo "🎉 Your Docker environment is ready for the Nordlys Trelys project!"
else
    echo "❌ Docker test failed"
    echo "💡 Check Docker Desktop is properly installed and running"
    exit 1
fi