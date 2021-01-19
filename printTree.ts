/**
 * 655. Print Binary Tree
 * 
 * 1. Apply BFS twice. One to find the height.
 * 2. Another one is to find the index of the matrix.
 */


/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//         this.val = (val === undefined ? 0: val)
//         this.left = (left === undefined ? null: left)
//         this.right = (right === undefined ? null: right)
//     }
// }

// create an interface.
interface INode {
    node: TreeNode | null
    level: number
    left: number
    right: number
}

function printTree(root: TreeNode | null): string[][] {
    if(!root) return []

    // Find the height of the tree.
    let height = 0
    
    // create a queue
    let heightFindingQueue: Array<TreeNode|null>  = []

    // add the root node.
    heightFindingQueue.push(root)

    // add the level marker
    heightFindingQueue.push(null)

    // now iterate the queue and find the height
    while(heightFindingQueue.length != 0) {
        // pop the first element
        let node: TreeNode|null|undefined = heightFindingQueue.shift()

        if(!node) {
            // level is reached.
            height += 1
            // add a new level marker.
            if(heightFindingQueue.length > 0) heightFindingQueue.push(null)
        } else {
            // it is a node.
            // add its left and right child.
            if(node.left) heightFindingQueue.push(node.left)
            if (node.right) heightFindingQueue.push(node.right)
        }
    }

    // height = row and 2^(height)-1 = col.
    let resultant: string[][] = new Array(height)

    for(let i = 0; i < height; i++) {
        resultant[i] = new Array(Math.pow(2, height)-1).fill("")
    }

    // create a new queue to find the indexes of each node in the string array.
    let indexesFindingQueue: Array<INode|null> = []

    // add the root node.
    indexesFindingQueue.push({
        node: root,
        level: 0,
        left: 0,
        right: resultant[0].length
    })

    // add the level marker
    indexesFindingQueue.push(null)

    // now iterate the queue and find the indexes.
    while(indexesFindingQueue.length != 0) {
        // pop the first element.
        let treeNode: INode|null|undefined = indexesFindingQueue.shift()

        if(!treeNode) {
            // level is reached.

            // add a new level.
            if(indexesFindingQueue.length > 0) indexesFindingQueue.push(null)
        } else {
            // it is a node.
            let rowIndex = treeNode.level
            let colIndex = Math.floor((treeNode.left + treeNode.right) / 2)

            resultant[rowIndex][colIndex] = treeNode.node!.val.toString()

            // add its children.
            if(treeNode.node!.left) {
                indexesFindingQueue.push({
                    node: treeNode.node!.left,
                    level: treeNode.level + 1,
                    left: treeNode.left,
                    right: colIndex-1
                })
            }

            if(treeNode.node!.right) {
                indexesFindingQueue.push({
                    node: treeNode.node!.right,
                    level: treeNode.level + 1,
                    left: colIndex+1,
                    right: treeNode.right
                })
            }
        }
    }

    return resultant
};


// let tree = new TreeNode(1, new TreeNode(2, new TreeNode(4, new TreeNode(5))), new TreeNode(3, new TreeNode(7)))

// console.log(printTree(tree))
