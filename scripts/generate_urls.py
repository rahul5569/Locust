import os
import csv

CONTENT_DIR = "./content"
BASE_URL = "http://localhost:8080"

def generate_urls():
    with open("urls.csv", "w", newline="") as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(["URL"])  # Header
        for file in os.listdir(CONTENT_DIR):
            if os.path.isfile(os.path.join(CONTENT_DIR, file)):
                csvwriter.writerow([f"{BASE_URL}/{file}"])

if __name__ == "__main__":
    generate_urls()
