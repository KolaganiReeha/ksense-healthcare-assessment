function parseBloodPressure(bp) {
  if (!bp || typeof bp !== "string") return null;

  const parts = bp.split("/");
  if (parts.length !== 2) return null;

  const systolic = Number(parts[0]);
  const diastolic = Number(parts[1]);

  if (isNaN(systolic) || isNaN(diastolic)) return null;
  return { systolic, diastolic };
}

export function bloodPressureScore(bp) {
  const parsed = parseBloodPressure(bp);
  if (!parsed) return 0;

  const { systolic, diastolic } = parsed;

  if (systolic >= 140 || diastolic >= 90) return 3;
  if (systolic >= 130 || diastolic >= 80) return 2;
  if (systolic >= 120 && diastolic < 80) return 1;
  return 0;
}

export function temperatureScore(temp) {
  if (typeof temp !== "number") return 0;
  if (temp >= 101.0) return 2;
  if (temp >= 99.6) return 1;
  return 0;
}

export function ageScore(age) {
  if (typeof age !== "number") return 0;
  if (age > 65) return 2;
  if (age >= 40) return 1;
  return 0;
}

export function totalRiskScore(patient) {
  return (
    bloodPressureScore(patient.blood_pressure) +
    temperatureScore(patient.temperature) +
    ageScore(patient.age)
  );
}

export function hasDataQualityIssues(patient) {
  if (
    typeof patient.age !== "number" ||
    typeof patient.temperature !== "number" ||
    !parseBloodPressure(patient.blood_pressure)
  ) {
    return true;
  }
  return false;
}
