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
