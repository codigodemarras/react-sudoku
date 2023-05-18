import { HTMLProps } from 'react';

export type IconTypes = 'github' | 'heart' | 'linkedin' | 'twitter';

export interface IconProps {
  className?: string;
  color?: string;
}

export interface CustomIconsProps extends HTMLProps<any> {
  id: IconTypes;
  className?: string;
  color?: string;
}
