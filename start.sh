#!/bin/bash

# Exit on any error
set -e

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Change to backend directory and start the application
cd backend && npm start
