type GenerateRandomNumber = (min: number, max: number) => number;

export const generateRandomInteger: GenerateRandomNumber = (min: number, max: number): number => {
    const low = Math.ceil(min);
    const top = Math.floor(max);
    return Math.floor(Math.random() * (top - low) + low);
}

export const generateRandomIntegerInclusive: GenerateRandomNumber = (min: number, max: number) => {
    const low = Math.ceil(min);
    const top = Math.floor(max);
    return Math.floor(Math.random() * (top - low + 1) + low);
}

export const generateRandomArray = (generateFn: GenerateRandomNumber, length = 10, min = 1, max = 100): number[] => {
    const generatedArray: number[] = [];
    for (let i = 0; i < length; i++) {
        const newItem = generateFn(min, max);
        generatedArray.push(newItem);
    }
    return generatedArray;
}