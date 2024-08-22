import re
from dateutil import parser
import spacy
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.cluster import KMeans
import numpy as np

app = Flask(__name__)

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# Function to parse the amount from text
def parse_amount(text):
    match = re.search(r'\b\d+(\.\d{1,2})?\b', text)
    return match.group(0) if match else None

# Function to parse the date from text
def parse_date(text):
    parts = text.split("on")
    if len(parts) < 2:
        return None
    date_part = parts[-1].strip()
    date_patterns = [
        r'\b\d{1,2}[th|st|nd|rd]?\s+[A-Za-z]+\s+\d{4}\b',  
        r'\b\d{1,2}/\d{1,2}/\d{4}\b',  
        r'\b\d{1,2}-[A-Za-z]+-\d{4}\b',  
        r'\b\d{1,2}\s[A-Za-z]+\s\d{4}\b' 
    ]
    for pattern in date_patterns:
        match = re.search(pattern, date_part)
        if match:
            try:
                date_str = parser.parse(match.group(0), fuzzy=False).strftime('%d-%m-%Y')
                return date_str
            except (ValueError, OverflowError):
                continue
    return None

# Function to perform clustering
def perform_clustering(transactions):
    # Convert the transaction amounts to float
    amounts = [float(txn['amount']) for txn in transactions if txn['amount']]
    
    # Prepare features for clustering (e.g., amount, date)
    features = np.array(amounts).reshape(-1, 1)  # Currently using only amount

    # Perform K-means clustering
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(features)

    # Get cluster labels
    clusters = kmeans.predict(features)

    # Return cluster labels and centers
    return clusters, kmeans.cluster_centers_

# API to get spending insights (clusters)
@app.route('/spending-insights', methods=['POST'])
def spending_insights():
    # Assume data has been fetched from your backend API (expenses, income)
    transactions = request.json['transactions']  # List of transactions

    # Perform clustering on the transactions
    clusters, centers = perform_clustering(transactions)

    # Attach cluster info to each transaction
    for i, txn in enumerate(transactions):
        txn['cluster'] = int(clusters[i])

    # Return clusters and center details
    return jsonify({
        "clusters": clusters.tolist(),
        "centers": centers.tolist(),
        "transactions": transactions
    })

if __name__ == '__main__':
    app.run(debug=True)
