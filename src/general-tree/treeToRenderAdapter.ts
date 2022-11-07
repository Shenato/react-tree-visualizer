import { numArrayComparison } from '../utils/numbers';
import { RenderMatrix, Tree } from '../types';

/**
 * Return data should look like this
 *  [
 *  [ 1st Column ]
 *  [ 2nd Column ]
 *  [ 3rd Column ]
 *  [ 4th Column ]
 * ]
 *
 */
export function generateRenderTree<T>(
  generalTree: Tree<T>,
  collapsedIds: string[] = [],
  depth: number = 0,
  verticalStartingPoint = 0,
  parentId: number | undefined = undefined,
  id: number = 0,
  path: number[] = [],
  result: RenderMatrix<T> = [[]]
): {
  verticalStartingPoint: number;
  id: number;
  newResult: RenderMatrix<T>;
} {
  let currentVerticalStartingPoint = verticalStartingPoint;
  let currentResult = result;
  let currentIterationId = id;

  const { children, data, id: currentItemId, ...rest } = generalTree;
  const item = {
    ...rest,
    uniqueId: currentItemId,
    id: currentIterationId,
    parentId,
    y: currentVerticalStartingPoint,
    path,
    data,
  };

  currentResult[depth] = currentResult[depth]?.length
    ? [...currentResult[depth], item]
    : [item];

  if (children.length === 0 || collapsedIds.includes(currentItemId)) {
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
    } = generateRenderTree(
      children[i],
      collapsedIds,
      depth + 1,
      currentVerticalStartingPoint,
      id,
      currentIterationId + 1,
      [...path, i],
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
