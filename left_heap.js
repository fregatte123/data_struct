class tree_node {
    constructor(val,left,right,npl) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.npl = npl;
    }

    cal_npl(){
        let r_npl = (this.right && this.right.npl);
        let l_npl = (this.left && this.left.npl); 
        r_npl = r_npl==null || r_npl == undefined ? -1 : r_npl;
        l_npl = l_npl==null || l_npl == undefined ? -1 : l_npl;
        this.npl = Math.min(r_npl,l_npl)+1;
        console.log(`重新计算 npl = ${this.npl} r_npl = ${r_npl} l_npl = ${l_npl} val = ${this.val}`)
        return this.npl;
    }
}

class left_heap {
    
    constructor() {
        this.root = null;
    }

    merge_tree(tree1,tree2){
        let self = this;
        if(!tree1 && !tree2) return;
        let root_node;
        //--------- 小根节点的右儿子与大根节点 递归合并 -----------
        if(tree1 && tree2) {
            if(tree1.val<=tree2.val) {
                root_node = inner(tree1,tree2)
            } else {
                root_node = inner(tree2,tree1)
            }
        } else if(tree1) {
            root_node = tree1
        } else if(tree2) {
            root_node = tree2;
        }
        //--------- 交换 左右儿子 -----------------------------
        let r_npl = (root_node.right && root_node.right.npl);
        let l_npl = (root_node.left && root_node.left.npl);
        r_npl = r_npl==null || r_npl == undefined ? -1 : r_npl;
        l_npl = l_npl==null || l_npl == undefined ? -1 : l_npl;
        if(r_npl > l_npl) { //右边npl 长  则交换左右儿子
            let tmp = root_node.left;
            root_node.left = root_node.right;
            root_node.right = tmp;
        }
        return root_node;
        function inner(min_root,max_root) {
            if(min_root.right) {
                min_root.right = self.merge_tree(min_root.right,max_root);
            } else {
                min_root.right = max_root;  
            }
            min_root.cal_npl();
            return min_root;
        }
    }

    insert(val) {
        let node = new tree_node(val,null,null,0);
        this.root = this.merge_tree(this.root,node);
    }

    find_min(){

    }

    delete_min(){

    }

    to_d3(){
        let self = this;
        return travel(self.root);
        function travel(node) { 
            let children = [];
            node.left&&children.push(travel(node.left));
            node.right&&children.push(travel(node.right));
            return {
                name:node.val+`[${node.npl}]`,
                children
            }

        }
    }
}

let lh = new left_heap();
for(let i = 0;i<50;i++) {
    lh.insert(Math.floor(Math.random()*1000));
}

show_tree(lh.to_d3());