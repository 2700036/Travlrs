import React, {useRef, useCallback, useEffect} from 'react';

export default (Wrapped) => {
  return ({ title, name, onClose, ...props }) => {
    const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', onClose, true)
  }, [onClose])
  
  useEffect(() => {
    const escFunction = ({keyCode}) => {
      if(keyCode === 27) {
        smoothClose();
      }
    }
    const hadleOverlayClick = ({target})=>{
      if(target.classList.contains('popup')){
        smoothClose();
      }
    }
    popup.current.classList.add('popup_is-opened')
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
      
    };
  }, [smoothClose]);

    return (      
    <div ref={popup} className={`popup popup_type_${name} `}>
      <div className='popup__content' >
        <button 
        type='button' 
        className='popup__close'
        onClick={smoothClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        <Wrapped {...props}/>
      </div>
    </div>     
    )
  }
}
  
  

