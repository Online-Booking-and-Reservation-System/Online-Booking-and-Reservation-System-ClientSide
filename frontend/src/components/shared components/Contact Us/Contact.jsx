import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Contact({ trigger, closeModal }) {
   
    return (trigger) ? (
        <div className="popup-overlay">
            <div className="c-popup">
            <div className="contact-container">
                    <div className="contact-header">
                        <button className="contact-close-btn" onClick={closeModal}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="contact-title">Contact Us</h2>
                    </div>
                    <div className="contact1">
                        <p className="email-contact">Our&nbsp;Email: </p>
                        <p className="c-e">
                             <a href="mailto:tableBooky@gmail.com">tableBooky@gmail.com</a>
                        </p>
                    </div>
                    <div className="contact2">
                        <p className="hotLine-contact">Our&nbsp;HotLine: </p>
                        <p className="h-c">181901</p>
                    </div>
                </div>
            </div>

        </div>
    ):"";
    
}

export default Contact;