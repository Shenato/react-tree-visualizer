import { RenderMatrix, Tree } from '../types';

import { generateRenderTree } from './treeToRenderAdapter';

type TestCase = {
  generalTree?: Tree<any>;
  renderData?: RenderMatrix<any>;
  collapsedRenderData?: RenderMatrix<any>;
};
const testDictionary: TestCase = {
  generalTree: {
    data: { id: 0, ref: { current: null }, type: 0 },
    children: [
      {
        data: {
          type: 1,
          id: 4,
          ref: { current: null },
          disabled: false,
          hidden: false,
        },
        children: [
          {
            data: {
              type: 1,
              id: 14,
              ref: { current: {} },
              disabled: false,
              hidden: false,
            },
            children: [
              { data: { type: 0, id: 45, ref: { current: {} } }, children: [] },
            ],
          },
          {
            data: {
              type: 1,
              id: 15,
              ref: { current: {} },
              disabled: false,
              hidden: false,
            },
            children: [
              {
                data: {
                  scrollAxis: 1,
                  type: 1,
                  id: 17,
                  ref: { current: {} },
                  disabled: false,
                  hidden: false,
                },
                children: [
                  {
                    data: {
                      type: 0,
                      id: 22,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 23, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 24, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 25, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 26, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 27, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 28, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 29, ref: { current: {} } },
                    children: [],
                  },
                ],
              },
              {
                data: {
                  scrollAxis: 1,
                  type: 1,
                  id: 19,
                  ref: { current: {} },
                  disabled: false,
                  hidden: false,
                },
                children: [
                  {
                    data: { type: 0, id: 21, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 20,
                      ref: { current: {} },
                      disabled: true,
                    },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 30,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 31,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 32,
                      ref: { current: {} },
                      disabled: true,
                    },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 33,
                      ref: { current: {} },
                      disabled: true,
                    },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 34,
                      ref: { current: {} },
                      disabled: true,
                    },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 35, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 36, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 37,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 38, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 39, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 40, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 41,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 42, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: { type: 0, id: 43, ref: { current: {} } },
                    children: [],
                  },
                  {
                    data: {
                      type: 0,
                      id: 44,
                      ref: { current: {} },
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const biggerExample: TestCase = {
  generalTree: {
    data: { type: 0, id: 0, ref: { current: null } },
    children: [
      {
        children: [
          {
            children: [],
            data: {
              disabled: false,
              hidden: false,
              id: 2,
              ref: { current: null },
              type: 1,
            },
          },
          {
            children: [],
            data: {
              id: 3,
              disabled: false,
              hidden: false,
              ref: { current: null },
              type: 2,
            },
          },
        ],

        data: {
          id: 1,
          disabled: false,
          hidden: false,
          ref: { current: null },
          type: 1,
        },
      },
      {
        children: [
          {
            children: [],
            data: {
              disabled: false,
              hidden: false,
              id: 5,
              ref: { current: null },
              type: 1,
            },
          },
        ],
        data: {
          disabled: false,
          hidden: false,
          ref: { current: null },
          type: 2,
          id: 4,
        },
      },
    ],
  },
};

describe('given a real example general tree', () => {
  it('converts it to render data', () => {
    const { newResult } = generateRenderTree<any>(testDictionary.generalTree);

    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data', () => {
    const { newResult } = generateRenderTree<any>(biggerExample.generalTree);
    expect(newResult).toMatchSnapshot();
  });
});

describe('given a bigger example', () => {
  it('converts it to render data with collapsed children', () => {
    const { newResult } = generateRenderTree<any>(biggerExample.generalTree, [
      [0],
    ]);
    expect(newResult).toMatchSnapshot();
  });
});
