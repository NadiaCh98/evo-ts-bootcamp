import { MergeSortFunction, CompareFunction } from './DataStructures';

const mergeArrays = <T>(firstArray: T[], secondArray: T[], compareFunction: CompareFunction<T>): T[] => {
    const resultArray: T[] = [];
    while(firstArray.length && secondArray.length) {
        if (compareFunction(firstArray[0], secondArray[0]) > 0) {
            resultArray.push(secondArray[0]);
            secondArray.shift();
        } else {
            resultArray.push(firstArray[0]);
            firstArray.shift();
        }
    }
    return [...resultArray, ...firstArray, ...secondArray];
}

export const mergeSort: MergeSortFunction = (array, compareFunction) => {
    if (array.length === 1) {
        return array;
    }
    const avg = Math.floor(array.length / 2);
    const fisrtSubarray = array.slice(0, avg);
    const secondSubarray = array.slice(avg, array.length);
    const sortedFirstArray = mergeSort(fisrtSubarray, compareFunction);
    const sortedSecondArray = mergeSort(secondSubarray, compareFunction);
    return mergeArrays(sortedFirstArray, sortedSecondArray, compareFunction);
}