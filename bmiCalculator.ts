const calculateBmi = (heightCm: number, weightKg: number): string => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let message;
    if (bmi < 18.5) {
        message = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        message = "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi < 29.9) {
        message = "Overweight";
    } else {
        message = "Obese";
    }

    return message;
}

console.log(calculateBmi(180, 74))