#!/bin/bash
# Vercel build script for MANOX frontend

echo "Starting MANOX frontend build..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"