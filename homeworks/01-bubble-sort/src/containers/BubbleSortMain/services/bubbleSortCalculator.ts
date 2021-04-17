export type IntervalResult<T> = Readonly<{
    intervalArray: Array<T>;
    currentItemIndex: number;
}>;

type SortFuction<T,> = (sortingArray: Array<T>, ascOrder?: boolean) => IntervalResult<T>[];

export const bubbleSort: SortFuction<number> = (items: number[], ascOrder = true) => {
    const updatingArray: number[] = [...items];
    const results: IntervalResult<number>[] = [];
    const itemsCount = updatingArray.length;
    for (let i = 0; i < itemsCount - 1; i++) {
        let swapped = false;
        for (let k = 0; k < itemsCount - i - 1; k++) {
            const interactionItem = updatingArray[k + 1];
            const currentItem = updatingArray[k];
            if (ascOrder ? currentItem > interactionItem : currentItem < interactionItem) {
                updatingArray[k + 1] = currentItem;
                updatingArray[k] = interactionItem;
                swapped = true;
            }
            const intervalArray = [...updatingArray];
            results.push({
                currentItemIndex: k,
                intervalArray
            });
        }
        if (!swapped) {
            return results;
        }
    }
    return results;
}
