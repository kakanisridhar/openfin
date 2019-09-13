// @flow
import React from 'react';

type Props = {
  children: string,
};

const Button = (props: Props) => {
  const { children } = props;
  return (
    <div>
      <button type="button">{children}</button>
    </div>
  );
};

export default Button;
