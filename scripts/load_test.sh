#!/bin/bash
set -e

# Step 1: Build and start the Docker container
echo "Starting the Docker container..."
docker compose up -d --build

# Step 2: Generate the URLs file
echo "Generating URLs..."
python3 ./scripts/generate_urls.py

# Step 3: Run the load test
echo "Running load test with k6..."
k6 run ./tests/test.js

# Step 4: Stop the Docker container
echo "Stopping the Docker container..."
docker compose down
