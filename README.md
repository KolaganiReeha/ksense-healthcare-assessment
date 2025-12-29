# Ksense Healthcare API Assessment

This project implements the Ksense Healthcare API take-home assessment using **Create React App** and **JavaScript**.

The application:
- Fetches paginated patient data from the provided API
- Handles rate limiting and intermittent API failures with retry logic
- Calculates patient risk scores based on Blood Pressure, Temperature, and Age
- Identifies:
  - High-risk patients (total risk score ≥ 4)
  - Fever patients (temperature ≥ 99.6°F)
  - Patients with data quality issues
- Submits the computed results to the assessment API endpoint

---

## Tech Stack
- React (Create React App)
- JavaScript
- Fetch API

---

## Risk Scoring Rules

### Blood Pressure Risk
- Normal (<120 / <80): 0 points
- Elevated (120–129 / <80): 1 point
- Stage 1 (130–139 or 80–89): 2 points
- Stage 2 (≥140 or ≥90): 3 points
- Invalid/Missing: 0 points

### Temperature Risk
- Normal (≤99.5°F): 0 points
- Low Fever (99.6–100.9°F): 1 point
- High Fever (≥101.0°F): 2 points
- Invalid/Missing: 0 points

### Age Risk
- Under 40: 0 points
- 40–65: 1 point
- Over 65: 2 points
- Invalid/Missing: 0 points

**Total Risk Score = BP + Temperature + Age**

---

## Features
- Handles pagination and API retries
- Implements risk scoring per spec
- Handles invalid/missing patient data
- Submits assessment results to Ksense API

## Setup
1. npm install
2. Add API key to .env
3. npm start


