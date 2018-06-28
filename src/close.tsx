import React from 'react';
import cx from 'classnames';
import { IStyles, IClassNames } from './modal';

export interface IProps {
  classNames: IClassNames;
  styles: IStyles;
  classes: IClassNames;
  closeIconSize: number;
  closeIconSvgPath: SVGPathElement;
  onClickCloseIcon: (e: React.MouseEvent) => void;
}

const CloseIcon = ({
  classes,
  classNames,
  styles,
  closeIconSize,
  closeIconSvgPath,
  onClickCloseIcon,
}: IProps) => (
  <button
    className={cx(classes.closeButton, classNames.closeButton)}
    style={styles.closeButton}
    onClick={onClickCloseIcon}
  >
    <svg
      className={cx(classes.closeIcon, classNames.closeIcon)}
      style={styles.closeIcon}
      xmlns="http://www.w3.org/2000/svg"
      width={closeIconSize}
      height={closeIconSize}
      viewBox="0 0 36 36"
    >
      {closeIconSvgPath}
    </svg>
  </button>
);

export default CloseIcon;
