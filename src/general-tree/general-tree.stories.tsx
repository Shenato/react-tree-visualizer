import React, { createContext, useContext, useEffect, useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import useWindowSize from '../hooks/use-window-size';
import {
  DebugItemDataType,
  ItemComponentProps,
  Tree as TreeType,
} from '../types';
import { defaultStyle } from '../settings';
import GeneralTree from './general-tree';
import SvgViewer from '../svg-viewer';

import {
  simpleTree as generalTreeMock,
  simpleTreeMutatedAtBranch,
  simpleTreeMutatedAtLeaf,
} from '../mock-data/simple-tree';

export default {
  title: 'Components/Tree',
  component: GeneralTree,
};

const activeItemSetterContext = createContext((itemId: string) => {});

const MockItemComponent = ({
  item,
  onMouseEnter,
  onMouseLeave,
  isCollapsed,
  toggleCollapse,
  isHighlighted,
  connectorColor,
  computedStyles,
}: ItemComponentProps<DebugItemDataType>) => {
  const setActiveItem = useContext(activeItemSetterContext);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      onDoubleClick={() => setActiveItem?.(`${item.id}`)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          margin: '25px 5px 25px 5px',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            background: isHighlighted ? 'pink' : '#eeeeee',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#222222' }}>{item?.id ?? ''}</span>
          <button type="button" onClick={toggleCollapse}>
            {isCollapsed ? 'Show me' : 'Collapse me'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Template = ({ tree, itemComponent, ...args }) => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <GeneralTree
      // currentRound={4}
      itemComponent={itemComponent}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </SvgViewer>
      )}
      tree={tree}
      {...args}
    />
  );
};

export const TreeWithViewer = () => (
  <Template tree={generalTreeMock} itemComponent={MockItemComponent} />
);

export const TreeWithActiveItemsWithNoViewer = () => {
  const [activeItem, setActiveItem] = useState('22');

  return (
    <activeItemSetterContext.Provider
      value={(itemId: string) => {
        setActiveItem(itemId);
      }}
    >
      <GeneralTree
        activeItemIds={[activeItem]}
        itemComponent={MockItemComponent}
        tree={generalTreeMock}
      />
    </activeItemSetterContext.Provider>
  );
};
export const TreeWithNoViewer = () => {
  return (
    <GeneralTree
      // currentRound={4}
      itemComponent={MockItemComponent}
      tree={generalTreeMock}
    />
  );
};

export const AsyncTreeWithNoViewer = () => {
  const [tree, setTree] = useState<TreeType<DebugItemDataType>>({
    id: '0',
    data: { id: 0, type: 0 },
    children: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setTree(generalTreeMock);
    }, 300);
  }, []);
  return <Template tree={tree} itemComponent={MockItemComponent} />;
};

export const MutatingTreeAtLeafWithNoViewer = () => {
  const [tree, setTree] = useState<TreeType<DebugItemDataType>>({
    id: '0',
    data: { id: 0, type: 0 },
    children: [],
  });

  useEffect(() => {
    let flipflop = true;
    setInterval(() => {
      setTree(flipflop ? generalTreeMock : simpleTreeMutatedAtLeaf);
      flipflop = !flipflop;
    }, 1000);
  }, []);
  return (
    <GeneralTree
      // currentRound={4}
      itemComponent={MockItemComponent}
      tree={tree}
    />
  );
};

export const MutatingTreeAtBranch = () => {
  const [tree, setTree] = useState<TreeType<DebugItemDataType>>({
    id: '0',
    data: { id: 0, type: 0 },
    children: [],
  });

  useEffect(() => {
    let flipflop = true;
    setInterval(() => {
      setTree(flipflop ? generalTreeMock : simpleTreeMutatedAtBranch);
      flipflop = !flipflop;
    }, 1000);
  }, []);
  return (
    <GeneralTree
      // currentRound={4}
      itemComponent={MockItemComponent}
      tree={tree}
    />
  );
};
