/**
 * 55. Jump Game
 * 
 * The problem is to find if I start from the first index of the array, can I reach the 
 * the last index of the array by jumping in forward direction?
 * 
 * The problem is an amazingly brilliant one. The problem creator didnt mention that
 * it is a graph problem anywhere and gave it as a simple array problem.
 * 
 * The problem in graph terminology can be said as whether there is a path from
 * source vertext which is the first index to the destination vertex which is the 
 * last index of the array.
 * 
 * I prefer to call this as an undirected graph and apply a modified BFS algorithm to see
 * if there is a path from S to V.
 * 
 * Approach:
 * Create a frontier with first index of the array.
 * Iterate the Frontier until it is empty:
 *      If last index is in the frontier return true.
 *      else add the adjacent nodes of the processed element.
 * 
 * If the loop is ended then it means the last index is not reachable
 * so return false.
 */
function canJump2(nums: number[]): boolean {
    let frontier:Array<number> = [0] // 0
    let destinationVertex = nums.length-1 // 2
    while(frontier.length != 0) { // 1!=0
        let next: Array<number> = [] // []
        for(let eachNode of frontier) { //1
            if(eachNode === destinationVertex) return true // false
            //add its children.
            if(nums[eachNode] != 0) { // 1!=0
                for(let i = 0; i<nums[eachNode]; i++) { //i=0
                    let child = eachNode+i+1
                    if(child === destinationVertex) return true
                    next.push(child)//1+0+1
                }
            }
        }
        frontier = next //[1]
    }
    return false
};

function canJump(nums: number[]): boolean {
    let frontier:Array<number> = [0] // 0
    let alreadySeen: Set<number> = new Set()
    alreadySeen.add(0)
    let destinationVertex = nums.length-1 // 2
    while(frontier.length != 0) { //
        let eachNode = frontier.shift()
        if(eachNode === undefined) {
            return false
        } 
        if(eachNode === destinationVertex) return true
        if(nums[eachNode] != 0) {
            let i = 0
            while(i < nums[eachNode]) {
                let child = eachNode+i+1
                if(child === destinationVertex) return true
                if(!alreadySeen.has(child)) {
                    frontier.push(child)
                    alreadySeen.add(child)
                }
                
                i += 1
            }
        }
    }
    return false
}

// console.log(canJump2([1,1,1]))
// console.log(canJump2([2,3,1,1,4]))
// console.log(canJump2([3,2,1,0,4]))
// console.log(canJump2([4,1,3,2,6,4,1,3]))
// console.log(canJump2([0]))
