/**
 * 76. Minimum Window Substring
 * 
 * Input:
 * s: big string.
 * t: small string. [unqiue characters]
 * Find the minimum window in s that holds all the characters in t.
 * 
 * How to do?
 * Whenever there is a window problem always think about using two pointers to cover the window.
 * Lets call left and right pointers here.
 * 
 * Where should the left and right pointers to be initialized?
 * Since the problem wants minimum window, lets make left and right points to the first character of s string.
 * 
 * how to move the pointers?
 * 1) Move right by 1 until the window has all the characters of t. 
 *    In other way, expand the right by 1 until the t characters are in the window from left to right.
 * 2) Move left by 1 until window breaks to hold all the characters of t.
 * 
 * How to check if the window has all the characters of t in constant time?
 * 
 * Use a hash table where it stores the count of an element. whenever a count goes to zero then it means
 * the window doesn't have all characters of t. 
 * 
 * Pseudocode:
 * Initialize left and right pointers pointed to first element of the array.
 * Initialize an empty HashMap.
 * 
 * Until Right pointer is less than the s string length:
 *      do this until t string lenght shrinks to zero:
 *          if the element is in t then increment the hashMap of it by 1 and remove that element from t.
 *          if the element is not in t skip it.
 *      mark down the minimumWindowSize and minimumWindowRange.
 *      Inner iteration until left pointer movement breaks the window:
 *          Move left pointer by 1 and reduce the hash element by 1.
 *          if the hash element becomes zero break this inner loop and go back to outer loop 
 *          in iterating the right pointer.
 *          else mark down the minimumWindowSize and range.
 * 
 * Thats it!!!
 */
function minWindow(s: string, t: string): string {    
    if(s.length <= 1) return s === t ? s : ''
    let left = 0
    let right = 0
    let hashMap: Map<string, number> = new Map()
    let minimumWindowSize = Infinity
    let minimumWindowRange: Array<number> = []
    let missingElement = ''
    let windowMade = false
    let subStringHashTable: Map<string, number> = new Map()
    for(let i =0; i < t.length; i++) {
        subStringHashTable.set(
            t[i],
            (subStringHashTable.get(t[i]) || 0) + 1
        )
    }
    while(true) {
        let copyofT = missingElement === '' ? t : missingElement //a
        // iterate until right makes window to satisfy having all t elements.
        while(right < s.length){
            let currElement = s[right] // b
            if(!t.includes(currElement)) {
                right += 1
                continue
            }
            if(copyofT.length > 0 && t.includes(currElement)) {
                // add it to hashMap 
                hashMap.set(
                    currElement,
                    (hashMap.get(currElement) || 0) + 1
                )// a->1
                // remove it from t.
                copyofT = copyofT.replace(currElement, '') // ''
                if(copyofT.length === 0) {
                    // window is formed with all characters of t.
                    windowMade = true // true
                    let currentWindowSize = right - left + 1 // 1
                    if(minimumWindowSize > currentWindowSize) {
                        minimumWindowSize = currentWindowSize
                        minimumWindowRange = [left, right] // 0
                    }
                    break                    
                }
            }
            right += 1 // 1
        }
        if(!windowMade) return minimumWindowSize === Infinity ? '' : s.slice(minimumWindowRange[0], minimumWindowRange[1]+1)
        // now move left to find if the window size can be reduced and still keep it valid.
        while(left <= right) { // 1 <= 1
            let currElement = s[left] // b
            let currElementValue = (hashMap.get(currElement) || 0)
            if(t.includes(currElement)) {
                // mark down the minimumpath
                let currentWindowSize = right - left + 1 // 1
                if(minimumWindowSize > currentWindowSize) {
                    minimumWindowSize = currentWindowSize
                    minimumWindowRange = [left, right] // 0
                }
                hashMap.set(
                    currElement,
                    currElementValue - 1
                )
                currElementValue = (hashMap.get(currElement) || 0)
                if(currElementValue === 0 || currElementValue < (subStringHashTable.get(currElement) || 0)) {
                    // element becomes zero which means window is reduced.
                    missingElement = currElement
                    left += 1
                    break
                }                
            }
            left += 1
        }
        windowMade = false
        right += 1
    }
}



console.log(minWindow('AA','AA'))
console.log(minWindow('A', 'A'))
console.log(minWindow('AB', 'AB'))
console.log(minWindow('ABA', 'AB'))
console.log(minWindow('ABA', 'A'))
console.log(minWindow('ABAB', 'ABA'))
console.log(minWindow("ADOBECODEBANC", 'ON'))
console.log(minWindow("ADOBECODEBANC", 'BEAC'))
console.log(minWindow("ADOBECODEBANC", "AA"))
