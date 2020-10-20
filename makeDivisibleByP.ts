/**
 * Make Sum Divisbile by P
 * 
 * Find a subarray with minimum elements to remove from the given input array such that
 * the summation of the input array is Divisbile by P.
 * 
 * Where can the subarray form?
 * 1. Start of the first element until somewhere before the last element of the array.
 * 2. Middle of the array until the last element of the array.
 * 3. From Middle of the array to the last element of the array.
 * 
 * The subarray size could be:
 * 1. empty
 * 2. one
 * 3. more than one.
 * 
 * What is the approach?
 * 1. Sum the entire input array and find the modulo p. if it is zero then return 0 else proceed.
 * 2. find a subarray with the sum equals to the residue of the modulo operation.
 * 3. Keep two pointers i and j at the start of the array. 
 *      if the element is greater than the residueSum then 
 *          check element % p === residueSum:
 *              return 1
 *          move both the pointers to the next element. ---- ???
 *      if the sum of the i to j elements greater than residueSum then
 *          move i pointer until the sum from i to j is less or equal to residueSum. [Iterate]
 *      if the sum of the i to j elements are lesser than residueSum then
 *          move j pointer to the next element.
 *      else:
 *          subarray sum equals the residueSum. But still you could have a minimum subarray someother place so mark this 
 *          and go again in the loop until all elements are parsed.
 * 
 * 
 * Pseudocode:
 * let totalSum = Aggregate value of the input array.
 * let residueSum = totalSum % p 
 * 
 * if residueSum === 0:
 *      return 0
 * else:
 *      find a subarray with minimum elements that sums to residueSum
 *      let pointerI = 0
 *      let pointerJ = 0
 *      let soFarMinSubArrayLength = Infinity
 * 
 *      Iterate until the end of the array:
 *          if current element % p === residueSum:
 *              return as 1
 *          if sum(i to j) % p === residueSum and soFarMinSubArrayLength > (j-i+1):
 *              soFarMinSubArrayLength = j-i+1
 *              move both the pointers to next element.
 *          if (sum(i to j)% p) < residueSum:
 *              move pointerJ by 1
 *          if sum(i to j) > residueSum:
 *              while pointerI < pointerJ:
 *                  if sum(i to j) > residueSum:
 *                      move pointerI by 1
 *              pointerJ += 1
 *          
 * 
 * examples:
 * [4,4] p = 8
 * [4,4,1] p = 8
 * [2,3,4,4] p = 8
 * 
 * [4,4,2,3] p = 8
 * totalSum = 13
 * remainder = 13 % 8 = 5 = [i...j] % p 
 * 
 * [4,4,5] p = 8 r = 5 [5]
 * 
 * [10,4,4] p = 8
 * 
 * 18 % 8 = 2
 * 
 * [9,4,4]
 *   [i]
 *   [j]
 *              
 */


/**
 * [4,4] p = 8
 * [4,4,1] p = 8
 * [2,3,4,4] p = 8
 */
function minSubarray(nums: number[], p: number): number {
    let totalSum = nums.reduce((a,b)=>a+b)
    if(totalSum < p) return -1
    let residueSum = totalSum % p // 5

    if(residueSum === 0) return 0

    let pointerI = 0
    let pointerJ = 0
    let soFarMinSubArrayLength = Infinity
    let movingSumFromIToJ = 0
    let movingSumRemainder = 0

    while(pointerJ < nums.length) { // 0 < 4; 1<4
        let currentElement = nums[pointerJ] // 2 // 3 // 4 // 4
        movingSumFromIToJ += currentElement // 2 // 5 // 8
        console.log('the movingSumFromIToJ ' + movingSumFromIToJ)
        movingSumRemainder = movingSumFromIToJ % p
        if(movingSumRemainder === 0) {
            pointerJ += 1
        } else if(currentElement % p === residueSum) {
            return 1
        } else if(movingSumRemainder === residueSum && soFarMinSubArrayLength > (pointerJ-pointerI+1)) {
            soFarMinSubArrayLength = pointerJ-pointerI+1
            pointerJ += 1
            pointerI = pointerJ
            movingSumRemainder = 0
            movingSumFromIToJ = 0
        } else if(movingSumRemainder < residueSum) {
            pointerJ += 1
        } else if(movingSumRemainder > residueSum) {
            // move pointerI by 1
            console.log('else movingSumRemainder ' + movingSumRemainder)
            console.log('pointerI ' + pointerI + ' pointerJ ' + pointerJ)
            let flag = false
            while(pointerI != pointerJ && movingSumRemainder > residueSum) {
                    movingSumFromIToJ -= nums[pointerI] 
                    movingSumRemainder = movingSumFromIToJ % p
                    pointerI += 1
                    console.log('movingSumRemainder ' + movingSumRemainder)
            }
            pointerJ =  pointerJ + 1 
        }
    }
    return soFarMinSubArrayLength != Infinity && soFarMinSubArrayLength != nums.length ? soFarMinSubArrayLength : -1
};

// console.log(minSubarray([4,4],8) === 0)
// console.log(minSubarray([4,4,1],8) === 1)
// console.log(minSubarray([2,3,4,4], 8) === 2)
// console.log(minSubarray([4,4,2,3], 8) === 2)
// console.log(minSubarray([1], 1) === 0)
// console.log(minSubarray([1], 2) === -1)
// console.log(minSubarray([1,1], 2) === 0)
// console.log(minSubarray([1,1], 3) === -1)
// console.log(minSubarray([1,1,1], 3) === 0)
// console.log(minSubarray([2,3,4,6,1,3,7], 3) === 1)
// console.log(minSubarray([2,3,4,6,1,3,7], 2) === 0) // 26
// console.log(minSubarray([2,3,4,6,1,3,7], 4) === 1)
// console.log(minSubarray([2,3,4,6,1,3,7], 5) === 1)
// console.log(minSubarray([2,3,4,6,1,3,7], 6) === 1)
// console.log(minSubarray([2,3,4,6,1,3,7], 7) === 2)
// console.log(minSubarray([2,3,4,6,1,3,7], 8) === 1)
// console.log(minSubarray([2,3,4,6,1,3,7], 9) === 4)
// console.log(minSubarray([2,3,4,6,1,3,7], 10) === 1)
// console.log(minSubarray([2,3,4,6,3,7], 9) === 1)
console.log(minSubarray([26,19,11,14,18,4,7,1,30,23,19,8,10,6,26,3],26))
// console.log(minSubarray([9,4,4],8) === 1)
// console.log(minSubarray([3,6,8,1],8) === -1)

/**
 * console.log(minSubarray([2,3,4,6,1,3,7], 10) === 1)
 * [2,3,3,6,2,3,7]
 * totalSum = 26
 * P = 9
 * R = 8
 * 
 * [i..j] % p = 8
 * minSubarrayFound = 3
 * 
 * [2,3,3,6,2,3,7]
 *      i          
 *  j 
 */

/**
 * [3,6,8,1]
 * totalSum = 18
 * p = 8
 * remainder = 18 % 8 = 2
 * 
 * [3,6,8,1] 3 % 8 = 3 
 *      i
 *      j
 */

/**
 * [26,19,11,14,18,4,7,1,30,23,19,8,10,6,26,3]
 * p = 26
 * 
 * totalSum = 225
 * remainder = 17
 * 
 * [26] 0 < 17
 * [26,19] 19 > 17
 * [19,11] 4 < 17
 * [19,11,14] % 26 = 18  18 > 17
 * [11,14] 25 > 17
 * [14,18,4,7] 17 === 17
 * [18,4,7,1,30,23,19] 24 < 17
 * [4,7,1,30,23,19,8,10]
 * [7,1,30,23,19,8,10] 
 * [1,30,23,19,8,10,6]
 * [23,19,8,10,6] 14 < 17
 * [23,19,8,10,6,26,3] 17 == 17
 * 
 * 
 * 
 * [5,1,8,12,7,2,5,7,9,1,4] p = 3
 * totalSum = 61 
 * remainder = 1
 * 
 * p = 4
 * remainder = 1
 * 
 * p = 5
 * remainder = 1
 * 
 * p=6
 * remainder = 1
 * 
 * p=7
 * remainder = 5
 * 
 * p=11
 * remainder = 6
 * 
 * p=17
 * remainder = 10
 * 
 * 
 * [?,?,9,4,5]
 * 
 * [1,1,2,2]
 * 
 * [1,1,2,1,5,23] remainder = 5 divisor=7 totalSum = 33
 * 
 * if we say that adding an element to the sub array if the remainder of the subarray total % divisor is less than the residueSum:
 *      Then try to prove by proof contridiction.
 */
