const BASE_URL = "https://assessment.ksensetech.com/api";
const API_KEY = process.env.REACT_APP_API_KEY;

const headers = {
  "x-api-key": API_KEY
};

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function fetchPage(url) {
  const res = await fetch(url, { headers });

  if (res.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const text = await res.text();
  return JSON.parse(text);
}

export async function fetchAllPatients() {
  let page = 1;
  let hasNext = true;
  const patients = [];

  while (hasNext) {
    try {
      const response = await fetchPage(
        `${BASE_URL}/patients?page=${page}&limit=20`
      );

      if (!Array.isArray(response.data)) break;

      patients.push(...response.data);
      hasNext = response.pagination?.hasNext;
      page++;

      await sleep(1200);

    } catch (err) {
      if (err.message === "RATE_LIMIT") {
        console.warn("Rate limit hit — continuing with partial data");
        break; 
      }
      throw err;
    }
  }

  return patients;
}

export async function submitAssessment(payload) {
  const res = await fetch(`${BASE_URL}/submit-assessment`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return res.json();
}
