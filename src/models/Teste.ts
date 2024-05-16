// class TreeNode<T> {
//   value: T;
//   left: TreeNode<T> | null;
//   right: TreeNode<T> | null;

//   constructor(value: T) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// class BinaryTree<T> {
//   root: TreeNode<T> | null;
//   compareFn: (a: T, b: T) => boolean;

//   constructor(root: TreeNode<T> | null, compareFn: (a: T, b: T) => boolean) {
//     this.root = root;
//     this.compareFn = compareFn;
//   }

//   insert(value: T): void {
//     const newNode = new TreeNode<T>(value);

//     if (!this.root) {
//       this.root = newNode;
//       return;
//     }

//     let current = this.root;
//     while (true) {
//       if (this.compareFn(value, current.value)) {
//         if (!current.left) {
//           current.left = newNode;
//           return;
//         }
//         current = current.left;
//       } else {
//         if (!current.right) {
//           current.right = newNode;
//           return;
//         }
//         current = current.right;
//       }
//     }
//   }

//   public listInOrder() {
//     const list: T[] = [];
//     this.traverseInOrder(this.root, list);
//     return list;
//   }

//   private traverseInOrder(node: TreeNode<T> | null = this.root, list: T[]) {
//     if (node) {
//       this.traverseInOrder(node.left, list);
//       list.push(node.value);
//       this.traverseInOrder(node.right, list);
//     }
//   }
// }

// interface NodeValue<T> {
//   value: number;
//   item: T;
//   pai: string | null;
//   filhos: NodeValue<T>[];
// }

// type AssetNode = NodeValue<string>;
// const compareFn = (a: AssetNode, b: AssetNode) => a.value > b.value;
// const tree = new BinaryTree<AssetNode>(null, compareFn);

// const array = data();
// const root: BinaryTree<AssetNode>[] = [];
// const dictionary: { [key: string]: BinaryTree<AssetNode> } = {};

// array.forEach((i) => {
//   if (!dictionary[i.item]) {
//     dictionary[i.item] = new BinaryTree<AssetNode>(
//       new TreeNode<AssetNode>(i),
//       compareFn
//     );
//   } else {
//     const filhos = dictionary[i.item].root?.value.filhos;

//     dictionary[i.item] = {
//       ...dictionary[i.item],
//       ...i,
//       filhos,
//     };
//   }

//   if (!i.pai) {
//     root.push(dictionary[i.item]);
//   } else {
//     if (!dictionary[i.pai]) {
//       dictionary[i.pai] = new BinaryTree<AssetNode>(null, compareFn);
//     }

//     dictionary[i.pai].insert(dictionary[i.item]); // Adiciona como filho do pai correspondente
//   }
// });

// // tree.insert();

// console.log(tree.listInOrder());

// function data(): AssetNode[] {
//   return [
//     { item: 'A', pai: null, filhos: [], value: 10 },
//     { item: 'B', pai: 'C', filhos: [], value: 5 },
//     { item: 'C', pai: null, filhos: [], value: 15 },
//     { item: 'D', pai: 'B', filhos: [], value: 7 },
//     { item: 'E', pai: 'F', filhos: [], value: 80 },
//     { item: 'F', pai: 'A', filhos: [], value: 40 },
//     { item: 'G', pai: 'A', filhos: [], value: 3 },
//   ];
// }
