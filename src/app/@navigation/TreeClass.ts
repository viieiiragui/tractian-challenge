import type { Filter } from '@/contexts/GlobalContext';
import { AssetClass, type Asset } from '@/entities/Asset';
import { LocationClass, type Location } from '@/entities/Location';

class TreeNode<T> {
  item;
  children;

  constructor(item: T, children: TreeNode<T>[]) {
    this.item = item;
    this.children = children;
  }
}

type AssetTreeNode = TreeNode<AssetClass>;
type LocationTreeNode = TreeNode<LocationClass>;

export type TreeViewNode = AssetTreeNode | LocationTreeNode;
export type TreeViewType = Array<TreeViewNode>;

export class TreeView {
  private assetsData: Asset[];
  private locationsData: Location[];
  root: TreeViewType;

  constructor(locations: Location[], assets: Asset[]) {
    this.assetsData = assets;
    this.locationsData = locations;
    this.root = this.generateTree();
  }

  private generateTree(): TreeViewType {
    const assetDictionary: { [key: string]: Array<AssetTreeNode> } = {};
    const assetsWithoutLocation: Array<AssetTreeNode> = [];

    const assetsTree = this.buildTree<AssetTreeNode>(this.assetsData, 'asset');
    assetsTree.forEach((asset) => {
      if (asset.item?.locationId) {
        if (assetDictionary[asset.item.locationId]) {
          assetDictionary[asset.item.locationId].push(asset);
        } else {
          assetDictionary[asset.item.locationId] = [asset];
        }
      } else {
        assetsWithoutLocation.push(asset);
      }
    });

    const locationsTree = this.buildTree<LocationTreeNode>(
      this.locationsData,
      'location',
      assetDictionary
    );

    return [...locationsTree, ...assetsWithoutLocation];
  }

  private buildTree<T extends TreeNode<AssetClass | LocationClass>>(
    data: Array<Location | Asset>,
    type: 'asset' | 'location',
    dictionary?: { [key: string]: any }
  ) {
    const tree: { [key: string]: T } = {};
    const roots: Array<T> = [];
    const isAsset = type === 'asset';

    const ItemClass = isAsset ? AssetClass : LocationClass;

    for (const item of data) {
      const treeNode = new TreeNode(new ItemClass(item), []);

      if (!tree[treeNode.item.id]) {
        tree[treeNode.item.id] = treeNode as T;
      } else {
        const existingNode = tree[treeNode.item.id];
        // Atualiza os dados do nó existente mantendo os filhos anteriores
        tree[treeNode.item.id] = {
          ...existingNode,
          ...treeNode,
          children: existingNode.children,
        };
      }

      const parentId = treeNode.item.parentId;
      if (parentId === null || parentId === undefined) {
        roots.push(tree[treeNode.item.id] as T); // Adiciona à lista de raízes
      } else {
        if (!tree[parentId]) {
          tree[parentId] = new TreeNode<unknown>(null, []) as T;
        }
        tree[parentId].children.push(tree[treeNode.item.id]); // Adiciona como filho do pai correspondente
      }

      const hasChildren = dictionary && dictionary[treeNode.item.id];
      if (hasChildren) {
        tree[treeNode.item.id].children.push(...dictionary[treeNode.item.id]);
      }
    }

    return roots;
  }

  public find(value: string, filter?: Filter | null): TreeViewType {
    return this._findRecursive(this.root, value, filter);
  }

  private _findRecursive(
    node: TreeViewType | null,
    value: string,
    filter?: Filter | null
  ): TreeViewType {
    const array: TreeViewType = [];

    if (node) {
      for (const child of node) {
        let grandChildren: TreeViewType = [];
        if (child.children.length > 0) {
          grandChildren = this._findRecursive(child.children, value, filter);
        }

        let containFilter = false;
        if (filter && child.item instanceof AssetClass) {
          containFilter = [child.item.sensorType, child.item.status].includes(
            filter
          );
        }

        if (
          grandChildren.length > 0 ||
          (!filter && this._compareFn(child.item.name, value)) ||
          (filter && this._compareFn(child.item.name, value) && containFilter)
        ) {
          if (
            grandChildren.length === 0 &&
            this._compareFn(child.item.name, value) &&
            child.item instanceof LocationClass
          ) {
            array.push(child);
          } else {
            const newChild = { ...child };
            newChild.children = [...grandChildren];

            array.push(newChild);
          }
        }
      }
    }

    return array;
  }

  public findAssets(value: Filter) {
    return this._findAssetRecursive(this.root, value);
  }

  private _findAssetRecursive(
    node: TreeViewType | null,
    value: Filter
  ): TreeViewType {
    const array: TreeViewType = [];

    if (node) {
      for (const child of node) {
        let grandChildren: TreeViewType = [];
        if (child.children.length > 0) {
          grandChildren = this._findAssetRecursive(child.children, value);
        }

        let containValue = false;
        if (child.item instanceof AssetClass) {
          containValue = [child.item.sensorType, child.item.status].includes(
            value
          );
        }

        if (grandChildren.length > 0 || containValue) {
          const newChild = { ...child };
          newChild.children = [...grandChildren];

          array.push(newChild);
        }
      }
    }

    return array;
  }

  private _compareFn(a: string, b: string) {
    return a.toLowerCase().includes(b.toLowerCase());
  }
}
