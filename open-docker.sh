#!/bin/bash

# Script to open Docker Desktop on macOS

echo "🐳 Opening Docker Desktop..."

# Check if Docker Desktop is installed
if [ -d "/Applications/Docker.app" ]; then
    echo "✅ Docker Desktop found. Opening..."
    open /Applications/Docker.app
    echo "💡 Docker Desktop is now opening."
    echo "💡 Please wait for the Docker whale icon to appear in your menu bar."
    echo "💡 This may take a few moments on first launch."
else
    echo "❌ Docker Desktop not found in /Applications/"
    echo "💡 Please install Docker Desktop first by running:"
    echo "   ./docker-setup.sh"
    exit 1
fi

echo "
📝 Next steps:
1. Wait for Docker Desktop to finish starting up
2. Run './test-docker.sh' to verify Docker is working
3. Use './docker-dev.sh -b' to start the development environment
"