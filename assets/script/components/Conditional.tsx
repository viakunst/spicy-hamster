import { PropsWithChildren } from 'react';

type ConditionalProps = PropsWithChildren<{
  isVisible: () => boolean;
}>;

function Conditional({ isVisible, children }: ConditionalProps) {
  if (isVisible()) {
    return (
      { children }
    );
  }
}

export default Conditional;
