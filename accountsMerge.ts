/**
 * 721. Accounts Merge
 * 
 * Union and Find.
 */
function find(parent: Map<string, string>, node: string): string {
    // base case 
    if(!parent.has(node)) return node

    // recursive case 
    let result = find(parent, parent.get(node)!)
    parent.set(node, result)
    return result
}

function union(parent: Map<string, string>, nodeA: string, nodeB: string): void {  
    let parentA = find(parent, nodeA)
    let parentB = find(parent, nodeB)  
    parent.set(parentB, parentA)
}

function accountsMerge(accounts: string[][]): string[][] {
    let parent: Map<string, string> = new Map()
    let result: Map<string, string[]> = new Map()

    accounts.forEach((eachAcc: string[], index: number) => {
        let curr = 0
    
        // assign the first one to parent.
        let parentA = find(parent, eachAcc[1])
        if(parentA === eachAcc[1]) {
            parent.set(eachAcc[1], `${eachAcc[0]}-${index}`)
            result.set(`${eachAcc[0]}-${index}`, [])
        }
        
        let prev = 1
        
        for(curr = 2; curr < eachAcc.length; curr++) {
            let parentPrev = find(parent, eachAcc[prev])
            let parentCurr = find(parent, eachAcc[curr])


            // parents are not same then union 
            if(parentPrev != parentCurr) {
                union(parent, eachAcc[prev], eachAcc[curr])
            }

            prev = curr
        }

    })

    parent.forEach((value: string, key: string) => {
        let parentNode = find(parent, key)

        result.set(parentNode, [...result.get(parentNode) || [], key])
    })

    

    // remove key with empty values and split the -
    let rr: string[][] = []

    result.forEach((value: string[], key: string) => {
        if(value.length > 0) {
            // do split on key becaus key is in the format name-index.
            rr.push([key.split('-')[0], ...value.sort((a,b) => {
                if(a > b) return 1 
                else if(a < b) return -1
                else return 0
            }).filter((eachEmail) => !eachEmail.includes('-'))])
        }
    })
    return rr
};
