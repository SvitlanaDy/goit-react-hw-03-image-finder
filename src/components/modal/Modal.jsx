import css from 'components/modal/Modal.module.css'
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        selectedImage: PropTypes.string.isRequired,
      };


    componentDidMount(){
    // console.log('Modal componentDidMount');
    // window.addEventListener('keydown' , e => {
    //     console.log(e.code);
    //     if(e.code === 'Escape'){
    //         console.log('Push ESC, close the Modal window');
    //         this.props.onClose();
    //     }
    // });
    window.addEventListener('keydown', this.handleKeyDown);
    }


componentWillUnmount(){
    // console.log('Modal componentWilUnmount');
    // window.removeEventListener('keydown' , e => {
    //     console.log(e.code);
    //     if(e.code === 'Escape'){
    //         console.log('Push ESC, close the Modal window');
    //     }
    // });
    window.removeEventListener('keydown', this.handleKeyDown);
}
handleKeyDown = e => {
  if (e.code === 'Escape') {
    this.props.onClose();
  }
};

handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.selectedImage} alt="" />
        </div>
      </div>
    );
  }
}

// render(){
//     return(
//         <div className='Modal__backdrop'>
//             <div className='Modal__content'>(this.props.children)
//             <img src={this.props.selectedImage} alt="" />
//             </div>
//         </div>)
    
// }
// }

