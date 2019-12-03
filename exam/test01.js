/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {};
    //o(n) 
    for(var i=0;i<nums.length;i++) {
        map[nums[i]+""]=i;
    }
    //o(n)
    for(var j=0;j<nums.length;j++) {
        let w = target-nums[j];
        let m = map[w+""];
        if(m!==undefined && m!==null && m!=j) {
            return [j,m]
        }
    }
};
var res = twoSum([3,2,4],6);
console.log(res);