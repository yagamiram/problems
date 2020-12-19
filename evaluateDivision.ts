/**
 * 399. Evaluate Division
 * 
 * Do Division based on graph. Can this be done using DFS?
 * 
 * For the given input A,B check if both are in the same connected component graph/subtree/subgraph.
 * If they aren't then return -1 immeditately. Since Equations length is at most 20, so no need of thinking about optimization??
 * 
 * Apply DFS until you find the path from source node to destination node. Along the way multiple the weights of the edges and based on the equation do division
 */
interface INode {
    neighborNode: string
    weight: number
}

let totalCost: number[] = []

function find(parentOfEveryNode: Map<string, string>, vertex: string): string {

    if(parentOfEveryNode.get(vertex)! === "None") return vertex

    return find(parentOfEveryNode, parentOfEveryNode.get(vertex)!)
}

function union(parentOfEveryNode: Map<string, string>, nodeA: string, nodeB: string): void {
    // find its parent.
    let parentA = find(parentOfEveryNode, nodeA)
    let parentB = find(parentOfEveryNode, nodeB)

    // set the parent.
    parentOfEveryNode.set(parentA, parentB) 
}

// how to handle cycle.
function ApplyDFS(sourceNode: string, destNode: string, adjList: Map<string, INode[]>, currentPath: string[], cost: number[], alreadyVisited: Set<string>): void {
    // base case.
    if(sourceNode === destNode) {
        // reached.
        totalCost.push(cost.length === 0 ? 1 : cost.reduce((a,b) => a*b))
        return
    }

    // recursive case
    adjList.get(sourceNode)!.forEach((eachNode) => {
        if(!alreadyVisited.has(eachNode.neighborNode)) {
            cost.push(eachNode.weight)
            alreadyVisited.add(eachNode.neighborNode)
            currentPath.push(eachNode.neighborNode)
            ApplyDFS(eachNode.neighborNode, destNode, adjList, currentPath, cost, alreadyVisited)
            currentPath.pop()
            cost.pop()
        }
    })
}

function innerFunction(equations: string[][], values: number[], queries: string[][]): number[] {
    // create an adj list for the given edge set.
    let adjList: Map<string, INode[]> = new Map()

    let parentOfEveryNode: Map<string, string> = new Map()

    // think of this as an undirected edge.
    equations.forEach((eachEdge, index: number) => {
        let nodeA = eachEdge[0]
        let nodeB = eachEdge[1]
        let weight = values[index]

        let knownNeighborListOfA = adjList.get(nodeA) || []
        knownNeighborListOfA.push({
            neighborNode: nodeB,
            weight: weight,
        })

        adjList.set(
            nodeA,
            knownNeighborListOfA
        )

        parentOfEveryNode.set(
            nodeA,
            "None"
        )

        let knownNeighborListOfB = adjList.get(nodeB) ?? []
        knownNeighborListOfB.push({
            neighborNode: nodeA,
            weight: 1/weight,
        })

        adjList.set(
            nodeB,
            knownNeighborListOfB
        )

        parentOfEveryNode.set(
            nodeB,
            "None"
        )
    })

    // find the parents for each node.
    equations.forEach((eachEdge) => {
        let nodeA = eachEdge[0]
        let nodeB = eachEdge[1]

        // find the parent.
        let parentA = find(parentOfEveryNode, nodeA)
        let parentB = find(parentOfEveryNode, nodeB)

        if(parentA === parentB) {
            // cycle. 
            // do nothing.
        } else {
            // apply union.
            // set the parent to a node.
            union(parentOfEveryNode, parentA, parentB)
        }
    })


    // now iterate the queries
    queries.forEach((eachQuery: string[]) => {
        let nodeA = eachQuery[0]
        let nodeB = eachQuery[1]


        // find its parent using union-find. if the parent is same proceed. otherwise return for this query.
        // Before find the parent check if it is a known node.
        if(!adjList.has(nodeA) || !adjList.has(nodeB)) {
            totalCost.push(-1)
        } else {
            let parentA = find(parentOfEveryNode, nodeA)
            let parentB = find(parentOfEveryNode, nodeB)

            // if the parents aren't same then they are not from same subgraph.
            if(parentA != parentB) {
                totalCost.push(-1)
            } else {
                // same parents. so now apply DFS.
                // source vertex nodeA and destination vertex nodeB
                let alreadyVisited: Set<string> = new Set()
                alreadyVisited.add(nodeA)
                ApplyDFS(nodeA, nodeB, adjList, [nodeA], [], alreadyVisited)
            }
        }
    })
    return totalCost
};

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    totalCost = []
    return innerFunction(equations, values, queries)
}

// console.log(calcEquation(
//     [["a","b"],["b","c"],["b","g"],["c","d"],["c","h"]],
//     [2,5,10,1,6],
//     [["c","g"], ["c", "b"], ["b","a"], ["a","h"]]
// ))

// console.log(calcEquation(
//     [["a","b"],["b","c"]],
//     [2.0,3.0],
//     [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// ))
