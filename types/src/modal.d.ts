import React from 'react';
import cssClasses from './style.css';
export interface IBaseProps {
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    onEntered?: () => void;
    onExited?: () => void;
    onClose?: (e: React.MouseEvent | Event) => void;
    onEscKeyDown?: () => void;
    onOverlayClick?: (e: React.MouseEvent) => void;
    open?: boolean;
    classNames?: IClassNames | {
        [key: string]: string;
    };
    styles?: IStyles;
    center?: boolean;
    children?: React.ReactNode;
    classes?: IClassNames | {
        [key: string]: string;
    };
    showCloseIcon?: boolean;
    closeIconSize?: number;
    closeIconSvgPath?: JSX.Element;
    animationDuration?: number;
}
export interface IProps extends IBaseProps {
    open: boolean;
    center: boolean;
}
export interface IDefaultProps {
    styles: IStyles;
    classNames: IClassNames;
    classes: IClassNames;
    closeIconSize: number;
    closeIconSvgPath: SVGPathElement;
    animationDuration: number;
}
declare type PropsWithDefault = IProps & IDefaultProps;
export interface IClassNames {
    transitionEnter?: string;
    transitionEnterActive?: string;
    transitionExit?: string;
    transitionExitActive?: string;
    overlay?: string;
    modal?: string;
    closeButton?: string;
    closeIcon?: string;
    overlayCenter?: string;
}
export interface IStyles {
    overlay?: object;
    modal?: object;
    closeButton?: object;
    closeIcon?: object;
}
export interface IState {
    showProtal: boolean;
}
export default class Modal extends React.Component<IProps, IState> {
    static defaultProps: {
        classes: typeof cssClasses;
        closeOnEsc: boolean;
        closeOnOverlayClick: boolean;
        showCloseIcon: boolean;
        closeIconSize: number;
        closeIconSvgPath: JSX.Element;
        open: boolean;
        classNames: {};
        styles: {};
        children: null;
        center: boolean;
        animationDuration: number;
    };
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState): {
        showProtal: boolean;
    } | null;
    shouldClose: boolean;
    private maskRef;
    constructor(props: IProps);
    readonly useProps: PropsWithDefault;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps, prevState: IState): void;
    componentWillUnMount(): void;
    handleEntered: () => void;
    handleExited: () => void;
    handleClickOverlay: (e: React.MouseEvent<Element>) => void;
    handleOpen: () => void;
    handleClose: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleModalEvent: (e: React.MouseEvent<Element>) => void;
    handleClickCloseIcon: (e: React.MouseEvent<Element>) => void;
    breakScroll(): void;
    unbreakScroll(): void;
    render(): React.ReactPortal | null;
}
declare const show: (html: React.ReactNode, props?: IBaseProps | undefined) => Promise<{}>;
export { show };
