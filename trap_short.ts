/**
 * 42. Trapping Rain Water
 */
function trap(height: number[]): number {
    // find the forward max.
    let fMaxValue: number = -Infinity
    let forwardValues = height.reduce((acc: number[], curr: number, index: number) => {
        fMaxValue = Math.max(fMaxValue, curr)
        acc.push(fMaxValue)
        return acc
    },[]) //[2,2,2]

    // find backward max.
    let bMaxValue: number = -Infinity
    let backwardValues = height.reduceRight((acc: number[], curr: number, index: number) => {
        bMaxValue = Math.max(bMaxValue, curr)
        acc.push(bMaxValue)
        return acc
    },[]) // [2,1,1]

    return height.reduce((acc: number, curr: number, index: number) => {
        return acc + Math.abs(curr - Math.min(forwardValues[index], backwardValues[backwardValues.length-1 - index]))
    }, 0) // [0, 1, 0]
};
