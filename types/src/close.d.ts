import React from 'react';
import { IStyles, IClassNames } from './modal';
export interface IProps {
    classNames: IClassNames;
    styles: IStyles;
    classes: IClassNames;
    closeIconSize: number;
    closeIconSvgPath: SVGPathElement;
    onClickCloseIcon: (e: React.MouseEvent) => void;
}
declare const CloseIcon: ({ classes, classNames, styles, closeIconSize, closeIconSvgPath, onClickCloseIcon, }: IProps) => JSX.Element;
export default CloseIcon;
