/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    var new_current_node = new ListNode(0);
    var header = new_current_node;
    while (true) {
        if (!((l1 != null && l1.val != null) || (l2 != null && l2.val != null))) {
            break;
        }
        //上一位相加进位的值
        var v0 = new_current_node.val == null ? 0 : new_current_node.val;
        var v1 = l1 != null ? l1.val : 0;
        var v2 = l2 != null ? l2.val : 0;
        var sum = v1 + v2 + v0;
        //十位
        var sw = (sum >= 10 ? 1 : 0);
        //个位
        var gw = (sum >= 10 ? sum - 10 : sum);
        //设置当前节点的值
        new_current_node.val = gw;
        if((l1==null||l1.next==null)&&(l2==null||l2.next==null)&&sw==0) {
            break;
        }
        //初始化下一位
        var next_node = new ListNode(sw);
        new_current_node.next = next_node;
        //将下一位变成当前位
        new_current_node = next_node;
        //指针继续前行
        l1 = l1&&l1.next;
        l2 = l2&&l2.next;
    }
    return header;
};

function tran_to_node(arr) {
    var node = new ListNode();
    var header = node;
    for (let i = 0; i < arr.length; i++) {
        var a = arr[i];
        node.val = a;
        if (i == arr.length - 1) {
            break;
        }
        node.next = new ListNode();
        node = node.next;
    }
    return header;
}
var res = addTwoNumbers(tran_to_node([2, 4, 3]), tran_to_node([5, 6, 4]));
console.log(res);