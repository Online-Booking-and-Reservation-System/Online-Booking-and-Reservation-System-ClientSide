import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Contact({ trigger, closeModal }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can implement API call here to send the contact message
        console.log({
            name,
            email,
            message,
        });
        closeModal(); // Close modal after submission
        alert('Message sent successfully!');
    };
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
                        <p className="email-contact">Our Email: </p>
                        <p className="c-e">
                             <a href="mailto:tableBooky@gmail.com">tableBooky@gmail.com</a>
                        </p>
                    </div>
                    <div className="contact2">
                        <p className="hotLine-contact">Our HotLine: </p>
                        <p className="h-c">181901</p>
                    </div>
                </div>
            </div>

        </div>
    ):"";
    
}

export default Contact;