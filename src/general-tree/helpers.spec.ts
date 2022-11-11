import { DebugItemDataType, RenderMatrix } from 'types';
import {
  findItemFromRenderMatrix,
  findPathFromItem,
  processTree,
} from './helpers';
import { simpleTree, tinyTree } from '../mock-data/simple-tree';
import { generateRenderTree } from './treeToRenderAdapter';

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

// const renderMatrix: RenderMatrix<DebugItemDataType> = [
//   [
//     {
//       uniqueId: '4',
//       id: 1,
//       parentUniqueId: '0',
//       parentId: 0,
//       y: 0,
//       path: [0],
//       data: { type: 1, id: 4, disabled: false, hidden: false },
//     },
//   ],
//   [
//     {
//       uniqueId: '14',
//       id: 2,
//       parentUniqueId: '4',
//       parentId: 1,
//       y: 0,
//       path: [0, 0],
//       data: { type: 1, id: 14, disabled: false, hidden: false },
//     },
//     {
//       uniqueId: '15',
//       id: 4,
//       parentUniqueId: '4',
//       parentId: 1,
//       y: 1,
//       path: [0, 1],
//       data: { type: 1, id: 15, disabled: false, hidden: false },
//     },
//   ],
//   [
//     {
//       uniqueId: '45',
//       id: 3,
//       parentUniqueId: '14',
//       parentId: 2,
//       y: 0,
//       path: [0, 0, 0],
//       data: { type: 0, id: 45 },
//     },
//     {
//       uniqueId: '17',
//       id: 5,
//       parentUniqueId: '15',
//       parentId: 4,
//       y: 1,
//       path: [0, 1, 0],
//       data: { scrollAxis: 1, type: 1, id: 17, disabled: false, hidden: false },
//     },
//     {
//       uniqueId: '19',
//       id: 14,
//       parentUniqueId: '15',
//       parentId: 4,
//       y: 9,
//       path: [0, 1, 1],
//       data: { scrollAxis: 1, type: 1, id: 19, disabled: false, hidden: false },
//     },
//   ],
//   [
//     {
//       uniqueId: '22',
//       id: 6,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 1,
//       path: [0, 1, 0, 0],
//       data: { type: 0, id: 22 },
//     },
//     {
//       uniqueId: '23',
//       id: 7,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 2,
//       path: [0, 1, 0, 1],
//       data: { type: 0, id: 23 },
//     },
//     {
//       uniqueId: '24',
//       id: 8,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 3,
//       path: [0, 1, 0, 2],
//       data: { type: 0, id: 24 },
//     },
//     {
//       uniqueId: '25',
//       id: 9,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 4,
//       path: [0, 1, 0, 3],
//       data: { type: 0, id: 25 },
//     },
//     {
//       uniqueId: '26',
//       id: 10,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 5,
//       path: [0, 1, 0, 4],
//       data: { type: 0, id: 26 },
//     },
//     {
//       uniqueId: '27',
//       id: 11,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 6,
//       path: [0, 1, 0, 5],
//       data: { type: 0, id: 27 },
//     },
//     {
//       uniqueId: '28',
//       id: 12,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 7,
//       path: [0, 1, 0, 6],
//       data: { type: 0, id: 28 },
//     },
//     {
//       uniqueId: '29',
//       id: 13,
//       parentUniqueId: '17',
//       parentId: 5,
//       y: 8,
//       path: [0, 1, 0, 7],
//       data: { type: 0, id: 29 },
//     },
//     {
//       uniqueId: '21',
//       id: 15,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 9,
//       path: [0, 1, 1, 0],
//       data: { type: 0, id: 21 },
//     },
//     {
//       uniqueId: '20',
//       id: 16,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 10,
//       path: [0, 1, 1, 1],
//       data: { type: 0, id: 20, disabled: true },
//     },
//     {
//       uniqueId: '30',
//       id: 17,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 11,
//       path: [0, 1, 1, 2],
//       data: { type: 0, id: 30 },
//     },
//     {
//       uniqueId: '31',
//       id: 18,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 12,
//       path: [0, 1, 1, 3],
//       data: { type: 0, id: 31 },
//     },
//     {
//       uniqueId: '32',
//       id: 19,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 13,
//       path: [0, 1, 1, 4],
//       data: { type: 0, id: 32, disabled: true },
//     },
//     {
//       uniqueId: '33',
//       id: 20,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 14,
//       path: [0, 1, 1, 5],
//       data: { type: 0, id: 33, disabled: true },
//     },
//     {
//       uniqueId: '34',
//       id: 21,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 15,
//       path: [0, 1, 1, 6],
//       data: { type: 0, id: 34, disabled: true },
//     },
//     {
//       uniqueId: '35',
//       id: 22,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 16,
//       path: [0, 1, 1, 7],
//       data: { type: 0, id: 35 },
//     },
//     {
//       uniqueId: '36',
//       id: 23,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 17,
//       path: [0, 1, 1, 8],
//       data: { type: 0, id: 36 },
//     },
//     {
//       uniqueId: '37',
//       id: 24,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 18,
//       path: [0, 1, 1, 9],
//       data: { type: 0, id: 37 },
//     },
//     {
//       uniqueId: '38',
//       id: 25,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 19,
//       path: [0, 1, 1, 10],
//       data: { type: 0, id: 38 },
//     },
//     {
//       uniqueId: '39',
//       id: 26,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 20,
//       path: [0, 1, 1, 11],
//       data: { type: 0, id: 39 },
//     },
//     {
//       uniqueId: '40',
//       id: 27,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 21,
//       path: [0, 1, 1, 12],
//       data: { type: 0, id: 40 },
//     },
//     {
//       uniqueId: '41',
//       id: 28,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 22,
//       path: [0, 1, 1, 13],
//       data: { type: 0, id: 41 },
//     },
//     {
//       uniqueId: '42',
//       id: 29,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 23,
//       path: [0, 1, 1, 14],
//       data: { type: 0, id: 42 },
//     },
//     {
//       uniqueId: '43',
//       id: 30,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 24,
//       path: [0, 1, 1, 15],
//       data: { type: 0, id: 43 },
//     },
//     {
//       uniqueId: '44',
//       id: 31,
//       parentUniqueId: '19',
//       parentId: 14,
//       y: 25,
//       path: [0, 1, 1, 16],
//       data: { type: 0, id: 44 },
//     },
//   ],
// ];
