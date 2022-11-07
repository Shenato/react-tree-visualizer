import { generateRenderTree } from './treeToRenderAdapter';
import { simpleTree, tinyTree } from '../mock-data/simple-tree';

describe('given a real example general tree', () => {
  it('converts it to render data', () => {
    const { newResult } = generateRenderTree<any>(simpleTree);

    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data', () => {
    const { newResult } = generateRenderTree<any>(tinyTree);
    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data with collapsed children', () => {
    const { newResult } = generateRenderTree<any>(tinyTree, ['4']);
    expect(newResult).toMatchSnapshot();
  });
});
