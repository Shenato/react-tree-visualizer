import { RenderMatrix, Tree } from '../types';

export function findPathFromItem<T>(
  result: string[] = [],
  parentId: string,
  renderMatrix: RenderMatrix<T>
): string[] {
  if (renderMatrix.length === 0) {
    return result;
  }
  if (renderMatrix.length === 1) {
    return [parentId, ...result];
  }
  const currentParentItem = renderMatrix[renderMatrix.length - 1].find(
    parent => parent.uniqueId === parentId
  );
  const newRenderMatrix = renderMatrix.slice(0, -1);
  return findPathFromItem(
    [currentParentItem.uniqueId, ...result],
    currentParentItem.parentUniqueId,
    newRenderMatrix
  );
}

export function findItemFromRenderMatrix<T>(
  renderMatrix: RenderMatrix<T>,
  uniqueId: string
) {
  for (let column = 0; column < renderMatrix.length; column++) {
    for (let row = 0; row < renderMatrix[column].length; row++) {
      const item = renderMatrix[column][row];

      if (item.uniqueId === uniqueId) {
        return { item, column };
      }
    }
  }
  return { item: undefined, column: undefined };
}
