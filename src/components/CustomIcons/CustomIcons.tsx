import React, { ReactElement, useCallback } from 'react';

import Github from './icons/Github';
import Heart from './icons/Heart';
import Linkedin from './icons/Linkedin';
import Twitter from './icons/Twitter';
import { CustomIconsProps } from './types';

const CustomIcons = ({ id, ...props }: CustomIconsProps): ReactElement => {
  const getIconById = useCallback((iconId: string): string => {
    const icons = {
      github: Github,
      heart: Heart,
      linkedin: Linkedin,
      twitter: Twitter,
    };

    return (icons as any)[iconId];
  }, []);

  const Component = getIconById(id);

  return <Component {...props} />;
};

CustomIcons.defaultProps = {
  className: null,
  color: null,
};

export default CustomIcons;
