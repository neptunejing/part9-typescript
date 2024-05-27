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

function calculateExercises(dailyExHours: number[], target: number): ResObject {
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
      ratingDescription = 'Not too bad but could be better';
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
  
  // Example usage
  const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
  const target = 2;
  console.log(calculateExercises(dailyExerciseHours, target));
  