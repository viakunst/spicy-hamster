/* eslint-disable react/button-has-type */

import * as React from 'react';
import './_button.scss';
import './_button_class.scss';
import ConfigContext from '../ConfigContext';

function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

function isReactFragment(node: React.ReactNode) {
  return React.isValidElement(node) && node.type === React.Fragment;
}

function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  // Pass to React.Children.map to auto fill key
  return React.Children.map(childList, (child) => insertSpace(child as React.ReactChild, needInserted));
}

function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (isReactFragment(child)) {
    return <span>{child}</span>;
  }
  return child;
}

const ButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];
export type ButtonType = typeof ButtonTypes[number];
const ButtonShapes = ['default', 'circle', 'round'];
export type ButtonShape = typeof ButtonShapes[number];
// const ButtonHTMLTypes = ['submit', 'button', 'reset'];

enum ButtonHTMLTypes { 'submit', 'button', 'reset' }
export type ButtonHTMLType = keyof typeof ButtonHTMLTypes | undefined;

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  /**
   * Shape of Button
   *
   * @default default
   */
  shape?: ButtonShape;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

type Loading = number | boolean;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    danger,
    shape = 'default',
    className,
    children,
    icon,
    ghost = false,
    block = false,
    /** If we extract items here, we don't need use omit.js */
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props;

  const htmlType1 = htmlType as ButtonHTMLType;

  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(ConfigContext);
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const isNeedInserted = () => React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);

  // =============== Update Loading ===============
  const loadingOrDelay: Loading = typeof loading === 'object' && loading.delay ? loading.delay || true : !!loading;

  React.useEffect(() => {
    let delayTimer: number | null = null;

    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }

    return () => {
      if (delayTimer) {
        // in order to not perform a React state update on an unmounted component
        // and clear timer after 'loadingOrDelay' updated.
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    };
  }, [loadingOrDelay]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick, disabled } = props;
    // https://github.com/ant-design/ant-design/issues/30207
    if (innerLoading || disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const autoInsertSpace = autoInsertSpaceInButton !== false;
  const kids = children || children === 0
    ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
    : null;

  const buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType}
      onClick={handleClick}
      ref={buttonRef}
    >
      {kids}
    </button>
  );

  return buttonNode;
};

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton);

Button.displayName = 'Button';

// Button.__VK_BUTTON = true;

export default Button;
