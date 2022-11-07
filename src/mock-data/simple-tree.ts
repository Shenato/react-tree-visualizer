import { DebugItemDataType, Tree } from '../types';

export const tinyTree: Tree<DebugItemDataType> = {
  id: '0',
  data: { type: 0, id: 0 },
  children: [
    {
      id: '1',
      data: {
        id: 1,
        disabled: false,
        hidden: false,

        type: 1,
      },
      children: [
        {
          id: '2',
          children: [],
          data: {
            disabled: false,
            hidden: false,
            id: 2,

            type: 1,
          },
        },
        {
          id: '3',
          children: [],
          data: {
            id: 3,
            disabled: false,
            hidden: false,
            type: 2,
          },
        },
      ],
    },
    {
      id: '4',
      data: {
        disabled: false,
        hidden: false,

        type: 2,
        id: 4,
      },
      children: [
        {
          id: '5',
          children: [],
          data: {
            disabled: false,
            hidden: false,
            id: 5,

            type: 1,
          },
        },
      ],
    },
  ],
};

export const simpleTree: Tree<DebugItemDataType> = {
  id: '0',
  data: { id: 0, type: 0 },
  children: [
    {
      id: '4',
      data: {
        type: 1,
        id: 4,

        disabled: false,
        hidden: false,
      },
      children: [
        {
          id: '14',
          data: {
            type: 1,
            id: 14,
            disabled: false,
            hidden: false,
          },
          children: [{ id: '45', data: { type: 0, id: 45 }, children: [] }],
        },
        {
          id: '15',
          data: {
            type: 1,
            id: 15,
            disabled: false,
            hidden: false,
          },
          children: [
            {
              id: '17',
              data: {
                scrollAxis: 1,
                type: 1,
                id: 17,
                disabled: false,
                hidden: false,
              },
              children: [
                {
                  id: '22',
                  data: {
                    type: 0,
                    id: 22,
                  },
                  children: [],
                },
                {
                  id: '23',
                  data: { type: 0, id: 23 },
                  children: [],
                },
                {
                  id: '24',
                  data: { type: 0, id: 24 },
                  children: [],
                },
                {
                  id: '25',
                  data: { type: 0, id: 25 },
                  children: [],
                },
                {
                  id: '26',
                  data: { type: 0, id: 26 },
                  children: [],
                },
                {
                  id: '27',
                  data: { type: 0, id: 27 },
                  children: [],
                },
                {
                  id: '28',
                  data: { type: 0, id: 28 },
                  children: [],
                },
                {
                  id: '29',
                  data: { type: 0, id: 29 },
                  children: [],
                },
              ],
            },
            {
              id: '19',
              data: {
                scrollAxis: 1,
                type: 1,
                id: 19,
                disabled: false,
                hidden: false,
              },
              children: [
                {
                  id: '21',
                  data: { type: 0, id: 21 },
                  children: [],
                },
                {
                  id: '20',
                  data: {
                    type: 0,
                    id: 20,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '30',
                  data: {
                    type: 0,
                    id: 30,
                  },
                  children: [],
                },
                {
                  id: '31',
                  data: {
                    type: 0,
                    id: 31,
                  },
                  children: [],
                },
                {
                  id: '32',
                  data: {
                    type: 0,
                    id: 32,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '33',
                  data: {
                    type: 0,
                    id: 33,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '34',
                  data: {
                    type: 0,
                    id: 34,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '35',
                  data: { type: 0, id: 35 },
                  children: [],
                },
                {
                  id: '36',
                  data: { type: 0, id: 36 },
                  children: [],
                },
                {
                  id: '37',
                  data: {
                    type: 0,
                    id: 37,
                  },
                  children: [],
                },
                {
                  id: '38',
                  data: { type: 0, id: 38 },
                  children: [],
                },
                {
                  id: '39',
                  data: { type: 0, id: 39 },
                  children: [],
                },
                {
                  id: '40',
                  data: { type: 0, id: 40 },
                  children: [],
                },
                {
                  id: '41',
                  data: {
                    type: 0,
                    id: 41,
                  },
                  children: [],
                },
                {
                  id: '42',
                  data: { type: 0, id: 42 },
                  children: [],
                },
                {
                  id: '43',
                  data: { type: 0, id: 43 },
                  children: [],
                },
                {
                  id: '44',
                  data: {
                    type: 0,
                    id: 44,
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
};
export const simpleTreeMutatedAtLeaf: Tree<DebugItemDataType> = {
  id: '0',
  data: { id: 0, type: 0 },
  children: [
    {
      id: '4',
      data: {
        type: 1,
        id: 4,

        disabled: false,
        hidden: false,
      },
      children: [
        {
          id: '14',
          data: {
            type: 1,
            id: 14,
            disabled: false,
            hidden: false,
          },
          children: [{ id: '45', data: { type: 0, id: 45 }, children: [] }],
        },
        {
          id: '15',
          data: {
            type: 1,
            id: 15,
            disabled: false,
            hidden: false,
          },
          children: [
            {
              id: '17',
              data: {
                scrollAxis: 1,
                type: 1,
                id: 17,
                disabled: false,
                hidden: false,
              },
              children: [
                {
                  id: '22',
                  data: {
                    type: 0,
                    id: 22,
                  },
                  children: [],
                },
                {
                  id: '23',
                  data: { type: 0, id: 23 },
                  children: [],
                },
                {
                  id: '24',
                  data: { type: 0, id: 24 },
                  children: [],
                },
                {
                  id: '25',
                  data: { type: 0, id: 25 },
                  children: [],
                },
                {
                  id: '26',
                  data: { type: 0, id: 26 },
                  children: [],
                },
                {
                  id: '27',
                  data: { type: 0, id: 27 },
                  children: [],
                },
                {
                  id: '28',
                  data: { type: 0, id: 28 },
                  children: [],
                },
                {
                  id: '29',
                  data: { type: 0, id: 29 },
                  children: [],
                },
              ],
            },
            {
              id: '19',
              data: {
                scrollAxis: 1,
                type: 1,
                id: 19,
                disabled: false,
                hidden: false,
              },
              children: [
                {
                  id: '30',
                  data: {
                    type: 0,
                    id: 30,
                  },
                  children: [],
                },
                {
                  id: '31',
                  data: {
                    type: 0,
                    id: 31,
                  },
                  children: [],
                },
                {
                  id: '32',
                  data: {
                    type: 0,
                    id: 32,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '33',
                  data: {
                    type: 0,
                    id: 33,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '34',
                  data: {
                    type: 0,
                    id: 34,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '35',
                  data: { type: 0, id: 35 },
                  children: [],
                },
                {
                  id: '36',
                  data: { type: 0, id: 36 },
                  children: [],
                },
                {
                  id: '37',
                  data: {
                    type: 0,
                    id: 37,
                  },
                  children: [],
                },
                {
                  id: '38',
                  data: { type: 0, id: 38 },
                  children: [],
                },
                {
                  id: '39',
                  data: { type: 0, id: 39 },
                  children: [],
                },
                {
                  id: '40',
                  data: { type: 0, id: 40 },
                  children: [],
                },
                {
                  id: '41',
                  data: {
                    type: 0,
                    id: 41,
                  },
                  children: [],
                },
                {
                  id: '42',
                  data: { type: 0, id: 42 },
                  children: [],
                },
                {
                  id: '43',
                  data: { type: 0, id: 43 },
                  children: [],
                },
                {
                  id: '44',
                  data: {
                    type: 0,
                    id: 44,
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
};

export const simpleTreeMutatedAtBranch: Tree<DebugItemDataType> = {
  id: '0',
  data: { id: 0, type: 0 },
  children: [
    {
      id: '4',
      data: {
        type: 1,
        id: 4,

        disabled: false,
        hidden: false,
      },
      children: [
        {
          id: '14',
          data: {
            type: 1,
            id: 14,
            disabled: false,
            hidden: false,
          },
          children: [{ id: '45', data: { type: 0, id: 45 }, children: [] }],
        },
        {
          id: '15',
          data: {
            type: 1,
            id: 15,
            disabled: false,
            hidden: false,
          },
          children: [
            {
              id: '19',
              data: {
                scrollAxis: 1,
                type: 1,
                id: 19,
                disabled: false,
                hidden: false,
              },
              children: [
                {
                  id: '21',
                  data: { type: 0, id: 21 },
                  children: [],
                },
                {
                  id: '20',
                  data: {
                    type: 0,
                    id: 20,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '30',
                  data: {
                    type: 0,
                    id: 30,
                  },
                  children: [],
                },
                {
                  id: '31',
                  data: {
                    type: 0,
                    id: 31,
                  },
                  children: [],
                },
                {
                  id: '32',
                  data: {
                    type: 0,
                    id: 32,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '33',
                  data: {
                    type: 0,
                    id: 33,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '34',
                  data: {
                    type: 0,
                    id: 34,
                    disabled: true,
                  },
                  children: [],
                },
                {
                  id: '35',
                  data: { type: 0, id: 35 },
                  children: [],
                },
                {
                  id: '36',
                  data: { type: 0, id: 36 },
                  children: [],
                },
                {
                  id: '37',
                  data: {
                    type: 0,
                    id: 37,
                  },
                  children: [],
                },
                {
                  id: '38',
                  data: { type: 0, id: 38 },
                  children: [],
                },
                {
                  id: '39',
                  data: { type: 0, id: 39 },
                  children: [],
                },
                {
                  id: '40',
                  data: { type: 0, id: 40 },
                  children: [],
                },
                {
                  id: '41',
                  data: {
                    type: 0,
                    id: 41,
                  },
                  children: [],
                },
                {
                  id: '42',
                  data: { type: 0, id: 42 },
                  children: [],
                },
                {
                  id: '43',
                  data: { type: 0, id: 43 },
                  children: [],
                },
                {
                  id: '44',
                  data: {
                    type: 0,
                    id: 44,
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
};
