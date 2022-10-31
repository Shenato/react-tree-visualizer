import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import styled from 'styled-components';
import useWindowSize from '../hooks/use-window-size';
import { ItemComponentProps } from '../types';
import { defaultStyle } from '../settings';
import GeneralTree from './general-tree';
import SvgViewer from '../svg-viewer';

import { simpleTree as generalTreeMock } from '../mock-data/simple-tree';

export default {
  title: 'Components/Tree',
  component: GeneralTree,
};

const StyledSvgViewer = styled(SvgViewer).attrs(props => {
  return {
    background: props.theme.canvasBackground,
    SVGBackground: props.theme.canvasBackground,
  };
})``;

const MockItemComponent = ({
  item,
  onMouseEnter,
  onMouseLeave,
  isCollapsed,
  toggleCollapse,
  isHighlighted,
  connectorColor,
  computedStyles,
}: ItemComponentProps<any>) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
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
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
      tree={tree}
      {...args}
    />
  );
};

export const Tree = () => (
  <Template tree={generalTreeMock} itemComponent={MockItemComponent} />
);
