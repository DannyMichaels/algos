/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


// This function checks whether there is a root-to-leaf path in a binary tree that sums up to a given targetsum
// If root is null, there is no path, so return false
// Uses two stacks to keep track of the nodes and their respective sums
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
// https://leetcode.com/problems/path-sum/description/
var hasPathSum = function(root, targetSum) {
    if (root === null) return false;

    const currStack = []; // stack to keep track of nodes in the binary tree
    const sumStack = []; // stack to keep track of the residual sum at each node

    currStack.push(root); // push the root node onto the node stack
    sumStack.push(targetSum - root.val); // calculate the residual sum at the root node and push onto residual sum stack

    while (currStack.length > 0) { // iterate through all nodes in the binary tree
        let currNode = currStack.pop(); // get the latest node from the node stack
        let currSum = sumStack.pop(); // get the residual sum for the latest node from the residual sum stack

        if (!currNode.left && !currNode.right && currSum === 0) { // if the latest node has no children and its residual sum is 0, then we have found a path from the root to the leaf node with the desired sum, so return true
            return true;
        }
        if (Boolean(currNode.left)) { // if the latest node has a left child, calculate the residual sum at that child and push it onto the residual sum stack, along with the child node onto the node stack
            currStack.push(currNode.left);
            sumStack.push(currSum - currNode.left.val);
        }
        if (Boolean(currNode.right)) { // if the latest node has a right child, calculate the residual sum at that child and push it onto the residual sum stack, along with the child node onto the node stack
            currStack.push(currNode.right);
            sumStack.push(currSum - currNode.right.val);
        }
    }

    return false; // if we have iterated through all nodes in the binary tree and haven't found a path with the desired sum, then no such path exists, so return false
};
