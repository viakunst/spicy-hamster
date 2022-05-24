import * as React from 'react';

enum DirectionTypes { 'up', 'down', 'left', 'right' }
export type DirectionType = keyof typeof DirectionTypes | undefined;

export const defaultPrefixCls = 'vkstyle';
export const defaultIconPrefixCls = 'vkicon';

let globalPrefixCls: string;
let globalIconPrefixCls: string;

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

// Prefix for classnames?
const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls !== null) {
    return customizePrefixCls;
  }
  return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};

const config = {
  getPrefixCls,
  autoInsertSpaceInButton: false,
  direction: 'down',
};

const ConfigContext = React.createContext(config);

export default ConfigContext;
