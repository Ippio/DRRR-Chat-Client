import './styles.css'

const Modal = ({display, children})=>{
    const showModal = display?'':'none'
    return(
        <div className="md-modal self-center justify-center flex-wrap" style={{ alignItems: 'center', display: showModal }}>
            <div className="md-modal__shade no-blur"></div>
            <div className="md-modal__box flex-grow" style={{ maxWidth: 'calc(1280px - 3rem)', maxHeight: 'calc(100% - 3rem)' }}>
                {/* <!----> */}
                {children}
                {/* <!----> */}
            </div>
        </div>
    )
}

export default Modal