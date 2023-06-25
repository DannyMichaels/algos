// https://www.youtube.com/watch?v=Hg82DzMemMI&ab_channel=KevinNaughtonJr.
// on this graph example: https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg
// 22 - 5 = 17 -> 17 - 4 = 13 -> 13 - 11 = 2 -> 2 - 2 = 0, return true.
var hasPathSum = function(root, targetSum) {
    if (root === null) return false;

    const reachedEnd =  !root.left && !root.right;
    const targetSumMet = targetSum - root.val === 0;

   if (reachedEnd && targetSumMet) {
       return true;
   } else {
       return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
   }
};
