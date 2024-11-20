import React from "react";

const ContactDetailsModal = ({ contact, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Contact Details</h3>
        <p>
          <strong>First Name:</strong> {contact.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {contact.lastName}
        </p>
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
