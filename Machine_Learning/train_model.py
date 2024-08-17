import random
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from dateutil import parser
import joblib

# Step 1: Generate Synthetic Data

# Expense categories
expense_categories = {
     "FOOD": ["groceries", "dining", "restaurant", "coffee", "snacks", "food shopping"],
    "TRANSPORTATION": ["bus fare", "taxi", "train ticket", "fuel", "car rental", "transport"],
    "HOUSING": ["rent", "mortgage payment", "property tax", "housing"],
    "UTILITIES": ["electricity bill", "water bill", "gas bill", "internet bill", "utilities"],
    "HEALTHCARE": ["doctor consultation", "medicine", "hospital bill", "healthcare"],
    "ENTERTAINMENT": ["movie tickets", "concert", "games", "entertainment"],
    "EDUCATION": ["school books", "tuition", "courses", "education"],
    "SHOPPING": ["clothes", "shoes", "shopping", "gadgets"],
    "PERSONAL_CARE": ["haircut", "spa", "salon", "personal care"],
    "INVESTMENTS": ["stocks", "bonds", "investment", "mutual funds"],
    "TRAVEL": ["flight tickets", "vacation", "hotel stay", "travel"],
    "GIFTS_DONATIONS": ["gift", "donation", "charity"],
    "INSURANCE": ["life insurance", "health insurance", "insurance premium"],
    "DEBT_REPAYMENT": ["loan repayment", "credit card payment", "debt repayment"],
    "CHILDCARE": ["daycare", "school fees", "childcare"],
    "PET_CARE": ["veterinary", "pet food", "pet care"],
    "SUBSCRIPTIONS": ["netflix", "gym membership", "subscriptions"],
    "TAXES": ["income tax", "property tax", "tax payment"],
    "MAINTENANCE": ["car repair", "home maintenance", "maintenance"],
    "COMMUNICATION": ["phone bill", "internet bill", "communication"],
    "OTHER": ["miscellaneous", "other expenses"]
}

# Income categories
income_categories = {
    "SALARY": ["salary", "wages", "paycheck"],
    "BUSINESS": ["business income", "company profits"],
    "INTEREST": ["interest income", "savings interest"],
    "RENTAL": ["rental income", "rent"],
    "INVESTMENT": ["investment income", "dividends"],
    "FREELANCE": ["freelance income", "contract work"],
    "PENSION": ["pension", "retirement income"],
    "ROYALTIES": ["royalties", "copyright income"],
    "CAPITAL_GAINS": ["capital gains", "investment profit"],
    "DIVIDENDS": ["dividends", "returns"],
    "BONUSES": ["bonus", "performance bonus"],
    "COMMISSIONS": ["commission", "sales commission"],
    "CHILD_SUPPORT": ["child support"],
    "ALIMONY": ["alimony"],
    "SOCIAL_SECURITY": ["social security"],
    "ANNUITIES": ["annuity income"],
    "LOTTERY": ["lottery winnings", "jackpot"],
    "GRANTS": ["grant", "scholarship"],
    "INHERITANCE": ["inheritance", "legacy"],
    "OTHER": ["miscellaneous income", "other income"]
}

# Combine categories
categories = {**expense_categories, **income_categories}

# Amounts and dates for synthetic data generation
amounts = ["100", "500", "1000", "2000", "5000", "750", "1200", "150", "3500", "900", "4500","787","453","8766","3945","871","231","981","98","76","56","40","30","454734","78564","45097","76421","78643","08976","76531","987542","987341","90743","200","732","134","763","742","965","842","8754"]
dates = ["1st January 2024", "15th February 2024", "23rd March 2024", "7th April 2024", "10th May 2024", "30th June 2024", "18th July 2024", "12th August 2024", "25th September 2024", "5th October 2024","19th November 2024","23rd December 2024","11th November 2024","29th February 2024","31st January 2024"]

# Generate synthetic data
training_data = []

for _ in range(1000):  # Adjust the number for more or less data
    category, keywords = random.choice(list(categories.items()))
    keyword = random.choice(keywords)
    amount = random.choice(amounts)
    date = random.choice(dates)
    # Attempt to parse the date using dateutil
    try:
        date_parsed = parser.parse(date).strftime('%d/%m/%Y')
    except ValueError:
        date_parsed = date  # Fallback to the original date if parsing fails
    text = f"{amount} rs {keyword} on {date_parsed}"
    training_data.append({"text": text, "category": category})

# Step 2: Convert the training data to a DataFrame
df = pd.DataFrame(training_data)

# Step 3: Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['category'], test_size=0.2, random_state=42)

# Step 4: Vectorize the text data
vectorizer = TfidfVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Step 5: Train the Logistic Regression model
model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

# Step 6: Evaluate the model
y_pred = model.predict(X_test_vectorized)
print(classification_report(y_test, y_pred))



# After training the model
joblib.dump(model, 'saved_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')  # Save the vectorizer












# Step 7: Test with new data

# Example new data (replace this with your actual test data)
new_data = ["1786 rs movie tickets on 10 Nov 2024",  # Expected: ENTERTAINMENT
            "2556 rs doctor consultation on 5th December 2024",  # Expected: HEALTHCARE
            "103200 rs stock investment on 2nd January 2024",  # Expected: INVESTMENT
            "1876 rs salary received on 1st February 2024",  # Expected: SALARY
            "1700 rs groceries on 3 Mar 2024"]  # Expected: FOOD

# Transform the new data using the same vectorizer
new_data_vectorized = vectorizer.transform(new_data)

# Predict the categories
predicted_categories = model.predict(new_data_vectorized)
description = text.split('on')[0]

# Display the results
for text, category in zip(new_data, predicted_categories):
  # Extract date part from the text (assuming the date is always after "on")
    date_part = text.split("on")[-1].strip()
    try:
        parsed_date = parser.parse(date_part)
        actual_date = parsed_date.strftime('%d %B %Y')
    except ValueError:
        actual_date = date_part  # Fallback to the original if parsing fails
    print(f"Text: '{text}' -> Predicted Category: '{category}' | Date: '{actual_date}'")