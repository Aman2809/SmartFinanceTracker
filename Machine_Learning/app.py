import re
from dateutil import parser
import spacy
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the trained model and vectorizer
import joblib
model = joblib.load('saved_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

def parse_date(text):
    # Split the text on "on" to isolate the date part
    parts = text.split("on")
    if len(parts) < 2:
        return None
    
    date_part = parts[-1].strip()
    
    # Define regex patterns for different date formats
    date_patterns = [
        r'\b\d{1,2}[th|st|nd|rd]?\s+[A-Za-z]+\s+\d{4}\b',  # e.g., 10th January 2024
        r'\b\d{1,2}/\d{1,2}/\d{4}\b',  # e.g., 01/10/2024
        r'\b\d{1,2}-[A-Za-z]+-\d{4}\b',  # e.g., 10-January-2024
        r'\b\d{1,2}\s[A-Za-z]+\s\d{4}\b'  # e.g., 10 January 2024
    ]

    # Try regex patterns first
    for pattern in date_patterns:
        match = re.search(pattern, date_part)
        if match:
            try:
                date_str = parser.parse(match.group(0), fuzzy=False).strftime('%d-%m-%Y')
                return date_str
            except (ValueError, OverflowError):
                continue
    
    # Fallback to SpaCy if regex fails
    doc = nlp(date_part)
    for ent in doc.ents:
        if ent.label_ == "DATE":
            try:
                date_str = parser.parse(ent.text, fuzzy=False).strftime('%d-%m-%Y')
                return date_str
            except (ValueError, OverflowError):
                continue

    return None


def parse_amount(text):
    # Use regex to find the amount
    match = re.search(r'\b\d+(\.\d{1,2})?\b', text)
    return match.group(0) if match else None

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['text']
    text = data.lower()
    
    # Extract relevant parts like amount, date, etc.
    amount = parse_amount(text)
    date = parse_date(text)
    description = text  # You can improve this to extract more precise descriptions

    # Vectorize the text
    text_vectorized = vectorizer.transform([text])

    # Get the category prediction
    category = model.predict(text_vectorized)[0]

    # Prepare the response
    response = {
        "category": category,
        "amount": amount,
        "date": date,
        "description": description
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
