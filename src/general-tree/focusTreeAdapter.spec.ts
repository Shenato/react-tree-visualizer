import { DebugItemDataType } from 'types';
import { generateRenderData } from './treeToRenderAdapter';
import { simpleTree, tinyTree } from '../mock-data/simple-tree';

describe('given a real example general tree', () => {
  it('converts it to render data', () => {
    const newResult = generateRenderData<DebugItemDataType>(simpleTree);

    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data', () => {
    const newResult = generateRenderData<DebugItemDataType>(tinyTree);
    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data with collapsed children', () => {
    const newResult = generateRenderData<DebugItemDataType>(tinyTree, ['4']);
    expect(newResult).toMatchSnapshot();
  });
});
