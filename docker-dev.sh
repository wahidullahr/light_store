#!/bin/bash

# Docker Development Script for Nordlys Trelys

# Default action
ACTION="up"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -b|--build)
      BUILD="--build"
      shift
      ;;
    up|down|logs|ps)
      ACTION="$1"
      shift
      ;;
    -h|--help)
      echo "Docker Development Script for Nordlys Trelys"
      echo ""
      echo "Usage: ./docker-dev.sh [options] [command]"
      echo ""
      echo "Commands:"
      echo "  up        Start containers (default)"
      echo "  down      Stop containers"
      echo "  logs      View container logs"
      echo "  ps        List containers"
      echo ""
      echo "Options:"
      echo "  -b, --build   Build images before starting containers"
      echo "  -h, --help    Show this help message"
      echo ""
      echo "Examples:"
      echo "  ./docker-dev.sh              # Start containers"
      echo "  ./docker-dev.sh -b           # Start containers with build"
      echo "  ./docker-dev.sh down         # Stop containers"
      echo "  ./docker-dev.sh logs         # View logs"
      exit 0
      ;;
    *)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

# Execute the appropriate docker-compose command
case $ACTION in
  up)
    echo "🚀 Starting development containers..."
    docker-compose up $BUILD
    ;;
  down)
    echo "🛑 Stopping containers..."
    docker-compose down
    ;;
  logs)
    echo "📋 Viewing container logs..."
    docker-compose logs
    ;;
  ps)
    echo "🔍 Listing containers..."
    docker-compose ps
    ;;
esac