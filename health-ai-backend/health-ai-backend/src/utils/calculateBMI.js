const calculateBMI = (weightKg, heightCm) => {
  const weight = Number(weightKg);
  const height = Number(heightCm);

  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) {
    throw new Error('Weight and height must be positive numbers.');
  }

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  return Number(bmi.toFixed(2));
};

export default calculateBMI;
