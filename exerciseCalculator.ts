interface ResObject {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

// exerciseCalculator.ts

export function calculateExercises(dailyExHours: number[], target: number): ResObject {
    const periodLength = dailyExHours.length;
    const trainingDays = dailyExHours.filter(day => day > 0).length;
    const totalHours = dailyExHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'Great';
    } else if (average >= target * 0.5) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    } else {
      rating = 1;
      ratingDescription = 'Come on';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  }
  
  const args = process.argv.slice(2);
  if (args.length < 2) {
      console.log('Please provide at least one target and one exercise hour');
      process.exit(1);
  }

  const [target, ...dailyExerciseHours] = args.map(Number);

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
      console.log('All arguments should be numbers');
      process.exit(1);
  }

  console.log(calculateExercises(dailyExerciseHours, target));
  