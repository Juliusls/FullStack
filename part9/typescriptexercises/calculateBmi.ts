interface BmiValues {
    height: number;
    weight: number;
  }

const parseArgument = (args: string[]): BmiValues => {
    if(args.length < 4) throw new Error('Not enought arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('At least one of the arguments is not a number');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const result = weight / ((height/100) * (height/100));
    if (result < 15) {
        return 'Very severely underweight';
    } else if (15 < result && result < 16) {
        return 'Severely underweight';
    } else if (16 < result && result < 18.5) {
        return 'Underweight';
    } else if (18.5 < result && result < 25) {
        return 'Normal (healthy weight)';
    } else if (25 < result && result < 30) {
        return 'Overweight';
    } else if (30 < result && result < 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (35 < result && result < 40) {
        return 'Obese Class II (Severely obese)';
    } else if (40 < result) {
        return 'Obese Class III (Very severely obese)';
    }
    return 'undefined';
};

try {
    const { height, weight } = parseArgument(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error) {
    console.log('Error, message: ', error);
}