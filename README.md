# t-modal
this is typescript lib 

### usage

```
npm install t-modal -S
```


```
es module/ts module

import Modal from 't-modal';

cmd

const modal = require('t-modal').default;
```


### 函数式用法

```
import { show } from 't-modal';

show(html);

const show = require('t-modal').show;

show(html);
```

### props

```
interface IBaseProps {
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

// 必选的参数
interface IProps extends IBaseProps {
  open: boolean;
  center: boolean;
}

// defaultProps默认有值的属性
interface IDefaultProps {
  styles: IStyles;
  classNames: IClassNames; // 整体的样式
  classes: IClassNames; // 样式簇
  closeIconSize: number; // icon的大小
  closeIconSvgPath: SVGPathElement; // svg样式
  animationDuration: number; // 动画过渡时间
}
```
