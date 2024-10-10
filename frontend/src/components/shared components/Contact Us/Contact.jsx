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
                        <span className="close-btn" onClick={closeModal}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <h2 className="contact-title">Contact Us</h2>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label className="contact-label">Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="contact-label">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="yourname@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="contact-label">Message</label>
                        <textarea
                            required
                            placeholder="Type your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="contact-submit" type="submit">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

        </div>
    ):"";
    
}

export default Contact;