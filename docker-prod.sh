#!/bin/bash

# Docker Production Script for Nordlys Trelys

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
      echo "Docker Production Script for Nordlys Trelys"
      echo ""
      echo "Usage: ./docker-prod.sh [options] [command]"
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
      echo "  ./docker-prod.sh              # Start production containers"
      echo "  ./docker-prod.sh -b           # Start production containers with build"
      echo "  ./docker-prod.sh down         # Stop production containers"
      echo "  ./docker-prod.sh logs         # View production logs"
      exit 0
      ;;
    *)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

# Execute the appropriate docker-compose command with production config
case $ACTION in
  up)
    echo "🚀 Starting production containers..."
    docker-compose -f docker-compose.prod.yml up $BUILD
    ;;
  down)
    echo "🛑 Stopping production containers..."
    docker-compose -f docker-compose.prod.yml down
    ;;
  logs)
    echo "📋 Viewing production container logs..."
    docker-compose -f docker-compose.prod.yml logs
    ;;
  ps)
    echo "🔍 Listing production containers..."
    docker-compose -f docker-compose.prod.yml ps
    ;;
esac