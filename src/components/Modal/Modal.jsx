import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImageURL, tags }) => {
  useEffect(() => {
    console.log('Компонент замаунтився в модалці');
    window.addEventListener('keydown', handlerEscape);
    return () => {
      console.log('Компонент розмонтувався в модалці');
      window.removeEventListener('keydown', handlerEscape);
    };
  }, []);

  const handlerEscape = e => {
    if (e.code === 'Escape') {
      //   console.log('e.code', e.code);
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

// export default class Modal extends Component {
// componentDidMount() {
//   console.log('Компонент замаунтився в модалці');
//   window.addEventListener('keydown', this.handlerEscape);
// }

// componentWillUnmount() {
//   console.log('Компонент розмонтувався в модалці');
//   window.removeEventListener('keydown', this.handlerEscape);
// }

// handlerEscape = e => {
//   if (e.code === 'Escape') {
//     //   console.log('e.code', e.code);
//     this.props.onClose();
//   }
// };

// handleBackdropClick = event => {
//   if (event.target === event.currentTarget) {
//     this.props.onClose();
//   }
// };

//   render() {
//     const { handleBackdropClick } = this;
//     const { largeImageURL, tags } = this.props;
//     // console.log(largeImageURL);
// return createPortal(
//   <div className="Overlay" onClick={handleBackdropClick}>
//     <div className="Modal">
//       <img src={largeImageURL} alt={tags} />
//     </div>
//   </div>,
//   modalRoot
// );
//   }
// }
