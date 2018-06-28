import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import noscroll from './utils/no-scroll';
import CloseIcon from './close';
import cssClasses from './style.css';

export interface IBaseProps {
  closeOnEsc?: boolean; // esc关闭modal
  closeOnOverlayClick?: boolean; // 点击蒙版关闭modal
  onEntered?: () => void; // 进入时执行的函数
  onExited?: () => void; // 离开时执行的函数
  onClose?: (e: React.MouseEvent | Event) => void; // 关闭modal时执行的函数
  onEscKeyDown?: () => void; // 摁下esc按键的回调函数
  onOverlayClick?: (e: React.MouseEvent) => void; // 点击蒙版时执行的函数
  open?: boolean; // 控制modal的显示与否
  classNames?: IClassNames | { [key: string]: string }; // 整体的样式
  styles?: IStyles; // modal的style样式
  center?: boolean; // 是否居中
  children?: React.ReactNode; // 子组件
  classes?: IClassNames | { [key: string]: string }; // 样式簇
  showCloseIcon?: boolean; // 控制closeIcon的显隐与否
  closeIconSize?: number; // icon的大小
  closeIconSvgPath?: JSX.Element; // svg样式
  animationDuration?: number; // 动画过渡时间
}

export interface IProps extends IBaseProps {
  open: boolean;
  center: boolean;
}

export interface IDefaultProps {
  styles: IStyles;
  classNames: IClassNames; // 整体的样式
  classes: IClassNames; // 样式簇
  closeIconSize: number; // icon的大小
  closeIconSvgPath: SVGPathElement; // svg样式
  animationDuration: number; // 动画过渡时间
}

// 这里其实也可以使用继承的方案去处理问题, 添加一个get this.defaultProps as XXX就行了
type PropsWithDefault = IProps & IDefaultProps;

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
  static defaultProps = {
    classes: cssClasses,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    showCloseIcon: true,
    closeIconSize: 28,
    closeIconSvgPath: (
      <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
    ),
    open: false,
    classNames: {},
    styles: {},
    children: null,
    center: false,
    animationDuration: 500,
  };

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (!prevState.showProtal && nextProps.open) {
      return {
        showProtal: true,
      };
    }
    return null;
  }

  shouldClose: boolean;
  private maskRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.maskRef = React.createRef();
    // showProtal用于控制删除modal的插入demo
    this.state = {
      showProtal: props.open,
    };
    this.shouldClose = false;
  }
  get useProps(): PropsWithDefault {
    return this.props as PropsWithDefault;
  }

  componentDidMount() {
    const { open } = this.props;
    open && this.handleOpen();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevState.showProtal && !this.state.showProtal) {
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  }

  /**
   * @desc 组件被移除的时候，执行handleClose函数
   */
  componentWillUnMount() {
    const { open } = this.props;
    open && this.handleClose();
  }

  /**
   * @desc 动画进入时执行
   */
  handleEntered = () => {
    const { onEntered } = this.props;
    onEntered && onEntered();
  };

  /**
   * @desc 动画结束时执行
   */
  handleExited = () => {
    const { onExited } = this.props;
    onExited && onExited();
    // 动画结束之后，改变一个state，然后重新执行render函数一遍，然后就把dom给移除了
    this.setState({
      showProtal: false,
    });
    this.unbreakScroll();
  };

  /**
   * @desc 蒙版被点击的时候，触发
   */
  handleClickOverlay = (e: React.MouseEvent) => {
    if (this.shouldClose) {
      this.shouldClose = true;
    }
    if (!this.shouldClose) {
      this.shouldClose = false;
    }
    if (this.props.onOverlayClick) {
      this.props.onOverlayClick(e);
    }
    if (this.props.closeOnOverlayClick && this.props.onClose) {
      this.props.onClose(e);
    }
    this.shouldClose = false;
  };

  /**
   * @desc 打开弹窗时，执行的函数
   */
  handleOpen = () => {
    this.breakScroll();
    document.addEventListener('keydown', this.handleKeyDown);
  };

  /**
   * @desc 关闭弹窗时，执行的函数
   */
  handleClose = () => {
    this.unbreakScroll();
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  /**
   * @desc 处理esc退出按钮时，处理onClose事件，
   */
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode !== 27) {
      return;
    }
    const { onEscKeyDown, onClose, closeOnEsc } = this.useProps;
    onEscKeyDown && onEscKeyDown();
    closeOnEsc && onClose && onClose(e);
  };

  /**
   * @desc 应该关闭
   */
  handleModalEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.shouldClose = false;
  };

  /**
   * @desc 鼠标点击关闭按钮事件,判断是否需要处理的传入事件，有就执行
   */
  handleClickCloseIcon = (e: React.MouseEvent) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  };

  /**
   * @desc 阻塞document的scroll滚动是事件
   */
  breakScroll() {
    noscroll.on();
  }

  /**
   * @desc 打开document的scroll事件
   */
  unbreakScroll() {
    noscroll.off();
  }

  render() {
    const {
      open,
      classes,
      classNames,
      animationDuration,
      center,
      styles,
      children,
      showCloseIcon,
      closeIconSize,
      closeIconSvgPath,
    } = this.props as PropsWithDefault;
    const { showProtal } = this.state;
    if (!showProtal) {
      return null;
    }
    return createPortal(
      <CSSTransition
        in={open}
        appear
        classNames={{
          appear: classNames.transitionEnter || classes.transitionEnter,
          appearActive:
            classNames.transitionEnterActive || classes.transitionEnterActive,
          enter: classNames.transitionEnter || classes.transitionEnter,
          enterActive:
            classNames.transitionEnterActive || classes.transitionEnterActive,
          exit: classNames.transitionExit || classes.transitionExit,
          exitActive:
            classNames.transitionExitActive || classes.transitionExitActive,
        }}
        timeout={animationDuration}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        <div
          ref={this.maskRef}
          className={cx(
            classes.overlay,
            center ? classes.overlayCenter : null,
            classNames.overlay,
          )}
          onClick={this.handleClickOverlay}
          style={styles.overlay}
        >
          <div
            className={cx(classes.modal, classNames.modal)}
            style={styles.modal}
            onMouseDown={this.handleModalEvent}
            onMouseUp={this.handleModalEvent}
            onClick={this.handleModalEvent}
          >
            {children}
            {showCloseIcon && (
              <CloseIcon
                classes={classes}
                classNames={classNames}
                styles={styles}
                closeIconSize={closeIconSize}
                closeIconSvgPath={closeIconSvgPath}
                onClickCloseIcon={this.handleClickCloseIcon}
              />
            )}
          </div>
        </div>
      </CSSTransition>,
      document.body,
    );
  }
}

const show = (html: React.ReactNode, props?: IBaseProps) => {
  let isOpen = true;
  return new Promise((resolve, reject) => {
    const Modal2 = (isOpen: boolean) =>
      React.createElement(
        Modal,
        {
          ...props,
          open: isOpen,
          center: true,
          onClose: () => {
            isOpen = false;
            ReactDOM.render(Modal2(isOpen), div);
          },
        },
        html,
      );
    const div = document.createElement('div');
    document.body.appendChild(div);
    try {
      ReactDOM.render(Modal2(isOpen), div);
      resolve();
    } catch (error) {
      reject(error);
    }

    document.body.removeChild(div);
  });
};

export { show };
