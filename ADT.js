const _ = require('lodash');
class ADT {
    constructor(x){
        this.root = {
            element:x,
            left:null,
            right:null
        }
    }
   find(x) {
        return c(this.root,x)
        function c(node,x){
            if(node) {
                if(node.element>x) {
                    return c(node.left,x);
                } else if(node.element<x) {
                    return c(node.right,x);
                } else {
                    return node;
                }
            }
        }
   } 
   findMax(){
       let node = this.root;
        while(node) {
            if(node.left) {
                node = node.left;
            } else {
                return node.element
            }
        }
   }
   findMin(){
        let node = this.root;
        while(node) {
            if(node.right) {
                node = node.right;
            } else {
                return node.element
            }
        }
   }
   insert(x){
    ist(this.root,x)
    function ist(node,x){
        if(node==null) {
            return {
                element:x,
                left:null,
                right:null
            }
        }
        if(node.element > x) {
            node.left = ist(node.left,x)
        } else if(node.element < x) {
            node.right = ist(node.right,x)
        } else {
            //重复数据 忽略
        }
        return node;
    }
   }
   remove(x){
    r(this.root,x);
    function r(node,x) {
        if(node.element>x) {
            node.left = r(node.left,x);
        } else if(node.element<x) {
            node.right = r(node.right,x);
        } else if(node.left!=null&&node.right!=null){
            let min_right_tree = find_min_right_tree(node);
            if(min_right_tree) {
                node.element = min_right_tree.element;
                node.right = r(node.right,min_right_tree.element)
            } 
        } else {
            node =  node.left?node.left:node.right;
        }
        return node;
    }
    function find_min_right_tree(node) {
        node = node.right
        while(node&&node.left) {
            node = node.left;
        }
        return node;
    }
   }
   printTree(){
    p(this.root,0)
    function p(n,depth){
        if(n) { 
            if(n.right){
                p(n.right,depth+1)
            }
            console.log(_.join(_.fill(new Array(depth),'|--'),'')+n.element) 
            if(n.left){
                p(n.left,depth+1)
            }
            
        } 
    }
   }
}
let adt = new ADT(50)
let n = [42,38,25,66,69,46,52,61,22,74,67,70,55,69,37,56,37,52,74,35,41,68,33,57,75,65,42,53,34,68,52,28,32,57,67,76,42,40,69,63,56,62,26,57,73,39,70,35,34,58,67,80,33,76,74,53,33,43,51,80]
for(let i=0;i<n.length;i++) {
    adt.insert(n[i]) 
}
adt.printTree(); 
console.log(`contains 42?`);
console.log(!!adt.find(42));
console.log(`contains 200?`);
console.log(!!adt.find(200));
console.log(`max`);
console.log(adt.findMax());
console.log(`min`);
console.log(adt.findMin());

adt.remove(55);
adt.printTree();