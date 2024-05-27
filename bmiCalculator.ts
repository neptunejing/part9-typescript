export const calculateBmi = (heightCm: number, weightKg: number): string => {
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


const args = process.argv.slice(2);
if (args.length !== 2) {
    process.exit(1);
}

const [height, weight] = args.map(Number);

if (isNaN(height) || isNaN(weight)) {
    console.log('Arguments should be numbers');
    process.exit(1);
}

console.log(calculateBmi(height, weight));
