/* eslint-disable react/prop-types */
import '../views/styles/modals.css'

const Modal = ({children, isOpen, closeModal}) => {
  return (
    <article className={`${isOpen&& "is-open" } modal `}>
      <div className="modal-container">
        <button className="modal-close" size="small" onClick={closeModal}> X </button>
        {children}
      </div>

    </article>
  )
}

export default Modal