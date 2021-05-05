import { CompareFunction } from './DataStructures';
import { mergeSort } from './MergeSort';

describe("Merge Sort", () => {

    const UNSORTED_NUMBERIC_ARRAY = [4, 3, 6, 1, 9, 23, 7, -9, 0];
    

    it("asserts mergeSort() with compareFunction = (a, b) => (a - b) return array with asc order", () => {
        const compareFunction: CompareFunction<number> = (a, b) => a - b;
        expect(mergeSort(UNSORTED_NUMBERIC_ARRAY, compareFunction)).toEqual(UNSORTED_NUMBERIC_ARRAY.sort(compareFunction));
    })

    it("asserts mergeSort() with compareFunction = (a, b) => (b - a) return array with desc order", () => {
        const compareFunction: CompareFunction<number> = (a, b) => b - a;
        expect(mergeSort(UNSORTED_NUMBERIC_ARRAY, compareFunction)).toEqual(UNSORTED_NUMBERIC_ARRAY.sort(compareFunction));
    });

    it("return sorted string array with asc order", () => {
        const UNSORTED_STRING_ARRAY = ['delta', 'alpha', 'charlie', 'bravo'];
        const compareFunction: CompareFunction<string> = (a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        };
        expect(mergeSort(UNSORTED_STRING_ARRAY, compareFunction)).toEqual(UNSORTED_STRING_ARRAY.sort(compareFunction));
    });

    it("return sorted studens array with desc order", () => {
        const students = [
            { name: "Alex",   grade: 15 },
            { name: "Devlin", grade: 15 },
            { name: "Eagle",  grade: 13 },
            { name: "Sam",    grade: 14 },
          ];
        const compareFunction: CompareFunction<{name: string, grade: number}> = (a, b) => b.grade - a.grade;
        expect(mergeSort(students, compareFunction)).toEqual(students.sort(compareFunction));
    });
});