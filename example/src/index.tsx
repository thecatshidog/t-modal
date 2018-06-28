import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import Modal, { show } from '../../src/index';
import Modal, { show } from 't-modal';
import './index.css';

interface IProps {}
interface IState {
  isOpen: boolean;
  isOpen2: boolean;
}

class Demo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
      isOpen2: true,
    };
  }

  onClick = () => {
    this.setState(
      {
        isOpen: true,
      },
      () => {},
    );
  };
  onClose = () => {
    this.setState({
      isOpen: false,
    });
    show(<div className="body">大傻逼</div>).then(() => {
      console.log('hehe');
    });
  };

  onShow = () => {
    show(<div className="body">hello world</div>).then(() => {
      console.log('打开模态框之后执行');
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div className="root">
        <button onClick={this.onClick}>点击弹窗</button>
        <button onClick={this.onShow}>点击函数式弹窗</button>
        <Modal open={isOpen} center={true} onClose={this.onClose}>
          <div className="body">hello world</div>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.querySelector('#app'));
