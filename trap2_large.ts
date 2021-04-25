/**
 * 42. Trapping Rain Water
 * Find the number of elements between first non zero element until last non-zero element.
 * Whichever is min, use it and subtract on every in-between element.
 */
interface IData {
    index: number
    total: number
}
function nextGreaterElement(data: number[]): number[] {
    // create a stack 
    let stack: number[] = []

    let nextGreaterElement: number[] = new Array(data.length).fill(-1)

    // insert the first element index in stack.
    stack.push(0)

    // store the index in the stack when iterating the data.
    for(let i =1; i<data.length; i++) {
        // check the top element of the stack.
        while(stack.length != 0 && data[stack[stack.length-1]] <= data[i]) {
            // pop 
            nextGreaterElement[stack.pop()!] = i
        }
        stack.push(i)
    }

    return nextGreaterElement
}

function trap2(height: number[]): IData {
    // first find the next greater element for each element in height
    let nextElement: number[] = nextGreaterElement(height)

    let totalCapacity: number = 0
    
    // go until first non-zero bar is found
    let j = 0
    while(j < height.length) {
        if(height[j] > 0) break
        j += 1
    }

    // iterate and find the water capacity
    let index = j
    while(index < height.length) {
        let eachBar = height[index]
        
        // pick the next greater element 
        let nextGreaterElementIndex: number = nextElement[index]

        if(nextGreaterElementIndex === -1) {
            return {
                index,
                total: totalCapacity
            }
        }
        
        // find the water capacity.
        if(eachBar === 0)  {
            totalCapacity += (nextGreaterElementIndex - index - 1) * height[nextGreaterElementIndex]
        } else {
            totalCapacity += (nextGreaterElementIndex - index - 1) * eachBar
            // loop from the current index until the nextGreaterElementIndex to find the blockae.
            let k = index + 1
            while(k < nextGreaterElementIndex) {
                let bar = height[k]
                if(bar > 0) {
                    totalCapacity -= bar
                }
                k += 1
            }
        }

        index = nextGreaterElementIndex
    }

    return {
        index,
        total: totalCapacity
    }
};

function trap(height: number[]): number {
    let leftToRight = trap2(height)

    if(leftToRight.index < height.length) {
        return leftToRight.total + trap2(height.slice(leftToRight.index).reverse()).total
    }
    
    return leftToRight.total
}
