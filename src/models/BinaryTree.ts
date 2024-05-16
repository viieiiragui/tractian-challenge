import type { Asset } from '@/entities/Asset';
import type { Location } from '@/entities/Location';
import type { Tree } from '@/entities/Tree';

function buildTreeA(
  data: Array<Location | Asset>,
  map?: { [key: string]: Array<Tree> }
): Array<Tree> {
  const tree: { [key: string]: Tree } = {};
  const roots: Array<Tree> = [];

  data.forEach((node) => {
    const treeNode: Tree = {
      item: node,
      type: getAssetOrLocationType(node),
      children: [],
    };

    if (!tree[node.id]) {
      tree[node.id] = treeNode;
    } else {
      const existingNode = tree[node.id];
      // Atualiza os dados do nó existente mantendo os filhos anteriores
      tree[node.id] = {
        ...existingNode,
        ...treeNode,
        children: existingNode.children,
      };
    }

    const parentId = node.parentId;
    if (parentId === null || parentId === undefined) {
      roots.push(tree[node.id]); // Adiciona à lista de raízes
    } else {
      if (!tree[parentId]) {
        tree[parentId] = { children: [] } as any;
      }
      tree[parentId].children.push(tree[node.id]); // Adiciona como filho do pai correspondente
    }

    const hasChildren = map && map[node.id];
    if (hasChildren) {
      tree[node.id].children.push(...map[node.id]);
    }
  });

  return roots;
}

function getAssetOrLocationTypeC(node: Asset | Location) {
  if ('sensorType' in node) {
    return node.sensorType
      ? 'component'
      : node.parentId
        ? 'sub-asset'
        : 'asset';
  }

  return node.parentId ? 'sub-location' : 'location';
}

// function joinAssetsWithLocations(
//   assets: Array<Asset>,
//   locations: Array<Location>
// ): Array<Tree> {
//   const assetsTree = buildTree(assets);
//   const assetMap: { [key: string]: Array<Tree> } = {};
//   const assetsWithoutLocation: Array<Tree> = [];

//   assetsTree.forEach((asset) => {
//     if ('locationId' in asset.item && asset.item.locationId) {
//       if (assetMap[asset.item.locationId]) {
//         assetMap[asset.item.locationId].push(asset);
//       } else {
//         assetMap[asset.item.locationId] = [asset];
//       }
//     } else {
//       assetsWithoutLocation.push(asset);
//     }
//   });

//   const locationsTree = buildTree(locations, assetMap);

//   return locationsTree.concat(assetsWithoutLocation);
// }

// const mergedData = joinAssetsWithLocations(
//   assetsResponse.toReversed(),
//   locationsResponse.toReversed()
// );
function buildTree(
  data: Array<Location | Asset>,
  map?: { [key: string]: Array<Tree> }
): Array<Tree> {
  const tree: { [key: string]: Tree } = {};
  const roots: Array<Tree> = [];

  data.forEach((node) => {
    const treeNode: Tree = {
      item: node,
      type: getAssetOrLocationType(node),
      children: [],
    };

    if (!tree[node.id]) {
      tree[node.id] = treeNode;
    } else {
      const existingNode = tree[node.id];
      // Atualiza os dados do nó existente mantendo os filhos anteriores
      tree[node.id] = {
        ...existingNode,
        ...treeNode,
        children: existingNode.children,
      };
    }

    const parentId = node.parentId;
    if (parentId === null || parentId === undefined) {
      roots.push(tree[node.id]); // Adiciona à lista de raízes
    } else {
      if (!tree[parentId]) {
        tree[parentId] = { children: [] } as any;
      }
      tree[parentId].children.push(tree[node.id]); // Adiciona como filho do pai correspondente
    }

    const hasChildren = map && map[node.id];
    if (hasChildren) {
      tree[node.id].children.push(...map[node.id]);
    }
  });

  return roots;
}

function getAssetOrLocationType(node: Asset | Location) {
  if ('sensorType' in node) {
    return node.sensorType
      ? 'component'
      : node.parentId
        ? 'sub-asset'
        : 'asset';
  }

  return node.parentId ? 'sub-location' : 'location';
}
