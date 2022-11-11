import { DebugItemDataType } from 'types';
import {
  findItemFromRenderMatrix,
  findPathFromItem,
  processTree,
} from './helpers';
import { simpleTree } from '../mock-data/simple-tree';

describe('findPathFromItem', () => {
  it('converts it to render data', () => {
    const renderMatrix = processTree(simpleTree);
    const columnIndex = 3;
    const rowIndex = 4;
    const testItem = renderMatrix[columnIndex][rowIndex];

    const result = findPathFromItem<DebugItemDataType>(
      [testItem.uniqueId],
      testItem.parentUniqueId,
      renderMatrix.slice(0, Math.max(columnIndex, 0))
    );

    expect(result).toMatchSnapshot();
  });
});

describe('findItemFromRenderMatrix', () => {
  it('converts it to render data', () => {
    const renderMatrix = processTree(simpleTree);
    const columnIndex = 3;
    const rowIndex = 4;
    const testItem = renderMatrix[columnIndex][rowIndex];

    const { item: resultItem } = findItemFromRenderMatrix<DebugItemDataType>(
      renderMatrix,
      testItem.uniqueId
    );

    expect(resultItem).toMatchObject(testItem);
  });
});
