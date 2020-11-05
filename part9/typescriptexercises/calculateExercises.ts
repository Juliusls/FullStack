interface ParcedArgs {
    target: number,
    hoursDaily: number[]
}

const parseArguments = (args: string[]): ParcedArgs => {
    if(args.length < 4) throw new Error('Not enought arguments');

    const target = Number(args[2]);
    const hoursDaily = args.slice(3).map(hours => Number(hours));

    if (target > 24 || hoursDaily.some(hours => hours > 24)) {
        throw new Error('Too many hours added in a day, day has maximum of 24 hours');
    }

    if (isNaN(target) || hoursDaily.map(hours => isNaN(hours)).includes(true)) {
        throw new Error('One of the entered values is not a number');
    }

    
    return { target, hoursDaily };
};

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

export const calculateExercises = (hoursDaily: number[], targer: number): Result => {
    // console.log('calculateExercises func, hoursDaily: ', hoursDaily);
    const periodLengthValue = hoursDaily.length;
    const trainingDaysValue = hoursDaily.filter(p => p !== 0).length;
    const targetValue = targer;
    const averageValue = hoursDaily.filter(p => p !== 0).reduce((a, b) => a + b, 0) / periodLengthValue;
    const successValue = (averageValue >= targetValue) ? true : false;
    const percentageOfTargetValue = averageValue * 100 / targetValue;
    let ratingValue;
    let ratingDescriptionValue;

    if (100 <= percentageOfTargetValue) {
        ratingValue = 3;
        ratingDescriptionValue = 'You reached your weekly exercise goal';
    } else if (80 < percentageOfTargetValue && percentageOfTargetValue < 100) {
        ratingValue = 2;
        ratingDescriptionValue = 'You are almost there';
    } else {
        ratingValue = 1;
        ratingDescriptionValue = 'Could be better, try harder';
    }


    const object =  {
        periodLength: periodLengthValue,
        trainingDays: trainingDaysValue,
        success: successValue,
        rating: ratingValue,
        ratingDescription: ratingDescriptionValue,
        target: targetValue,
        average: averageValue
    };

    return object;
};

try {
    const { target, hoursDaily } = parseArguments(process.argv);
    console.log(calculateExercises(hoursDaily, target));
} catch (error) {
    console.log('Error, message: ', error);
}


