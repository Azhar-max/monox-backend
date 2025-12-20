#!/bin/bash

# Exit on any error
set -e

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Change to backend directory
echo "Changing to backend directory..."
cd backend

# Print backend directory contents for debugging
echo "Backend directory contents:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the application
echo "Starting the application..."
npm start