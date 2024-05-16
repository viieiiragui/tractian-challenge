class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }
}

class MultiBinaryTree<T> {
  root: TreeNode<T>;

  constructor(rootValue: T) {
    this.root = new TreeNode(rootValue);
  }

  addChild(parentValue: T, childValue: T): void {
    const parentNode = this.findNode(parentValue);
    if (parentNode) {
      parentNode.children.push(new TreeNode(childValue));
    } else {
      console.error(`Node with value ${parentValue} not found`);
    }
  }

  findNode(value: T): TreeNode<T> | null {
    const recursiveSearch = (node: TreeNode<T>): TreeNode<T> | null => {
      if (node.value === value) {
        return node;
      }

      for (const child of node.children) {
        const foundNode = recursiveSearch(child);

        if (foundNode) {
          return foundNode;
        }
      }

      return null;
    };

    return recursiveSearch(this.root);
  }

  postorderTraversal(callback: (value: T) => void): void {
    const recursiveTraversal = (node: TreeNode<T>): void => {
      for (const child of node.children) {
        recursiveTraversal(child);
      }

      callback(node.value);
    };

    recursiveTraversal(this.root);
  }
}

const library = new MultiBinaryTree('Biblioteca');

library.addChild('Biblioteca', 'Livro 1');
library.addChild('Biblioteca', 'Livro 2');
library.addChild('Biblioteca', 'Livro 3');

library.addChild('Livro 1', 'Autor 1');
library.addChild('Livro 1', 'Autor 2');
library.addChild('Livro 1', 'Gênero 1');
library.addChild('Livro 1', 'Gênero 2');
library.addChild('Livro 2', 'Autor 3');
library.addChild('Livro 2', 'Gênero 2');
library.addChild('Livro 2', 'Tag 2');
library.addChild('Livro 2', 'Tag 3');

library.addChild('Livro 3', 'Autor 4');
library.addChild('Livro 3', 'Gênero 1');
library.addChild('Livro 3', 'Tag 1');
library.addChild('Livro 3', 'Tag 4');

const array: any[] = [];
library.postorderTraversal((value) => array.push(value));
console.log('🚀 ~ array:', array);
