import { RenderMatrix, Tree } from '../types';

/**
 * Return data should look like this
 *  [
 *    [ 1st Column ]
 *    [ 2nd Column ]
 *    [ 3rd Column ]
 *    [ 4th Column ]
 *  ]
 *
 */
export function generateRawRenderData<T>(
  generalTree: Tree<T>,
  collapsedIds: string[] = [],
  depth: number = 0,
  verticalStartingPoint = 0,
  parentUniqueId: string | undefined = undefined,
  parentId: number | undefined = undefined,
  id: number = 0,
  treePath: number[] = [],
  ancestryIds: string[] = [],
  result: RenderMatrix<T> = [[]]
): {
  verticalStartingPoint: number;
  id: number;
  newResult: RenderMatrix<T>;
} {
  let currentVerticalStartingPoint = verticalStartingPoint;
  let currentResult = result;
  let currentIterationId = id;

  const { children, data, id: currentItemUniqueId, ...rest } = generalTree;
  const item = {
    ...rest,
    uniqueId: currentItemUniqueId,
    id: currentIterationId,
    parentUniqueId,
    parentId,
    y: currentVerticalStartingPoint,
    ancestryIds,
    matrixPosition: [
      currentResult.length - 1,
      currentResult[depth]?.length ?? 0,
    ],
    treePath,
    data,
  };

  currentResult[depth] = currentResult[depth]?.length
    ? [...currentResult[depth], item]
    : [item];

  if (children.length === 0 || collapsedIds.includes(currentItemUniqueId)) {
    return {
      verticalStartingPoint: currentVerticalStartingPoint + 1,
      newResult: currentResult,
      id: currentIterationId,
    };
  }

  for (let i = 0; i < children.length; i++) {
    const {
      newResult,
      verticalStartingPoint: resultingVerticalStartingPoint,
      id: resultId,
    } = generateRawRenderData(
      children[i],
      collapsedIds,
      depth + 1,
      currentVerticalStartingPoint,
      currentItemUniqueId,
      id,
      currentIterationId + 1,
      [...treePath, i],
      [...ancestryIds, currentItemUniqueId],
      currentResult
    );
    currentIterationId = resultId;
    currentVerticalStartingPoint = resultingVerticalStartingPoint;
    currentResult = newResult;
  }

  return {
    verticalStartingPoint: currentVerticalStartingPoint,
    newResult: currentResult,
    id: currentIterationId,
  };
}

export function generateRenderData<T>(
  tree: Tree<T>[],
  collpasedItemIds?: string[]
) {
  const { newResult: renderDataRawUpdated } = generateRawRenderData<T>(
    {
      id: '',
      data: { id: 0, ref: false, type: 0, isFocused: false, shortcuts: [] },
      children: tree,
    },
    collpasedItemIds
  );
  const [, ...renderMatrix] = renderDataRawUpdated;

  return renderMatrix;
}
