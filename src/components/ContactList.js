import React, { useState } from "react";

const ContactList = ({ contacts, onDelete, onView, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName} ${contact.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <span>
              {contact.firstName} {contact.lastName} - {contact.phone}
            </span>
            <div>
              <button onClick={() => onView(contact)}>View</button>
              <button onClick={() => onEdit(contact)}>Edit</button>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
