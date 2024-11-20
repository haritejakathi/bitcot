import React, { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import AddEditContactModal from "./components/AddEditContactModal";
import ContactDetailsModal from "./components/ContactDetailsModal";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json"
    )
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const handleAddEditContact = (contact) => {
    if (modalMode === "add") {
      setContacts([...contacts, { id: Date.now(), ...contact }]);
    } else if (modalMode === "edit") {
      setContacts(
        contacts.map((c) => (c.id === contact.id ? { ...c, ...contact } : c))
      );
    }
    setIsModalOpen(false);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Contact Manager</h1>
      <button onClick={handleAddContact} className="add-button">
        Add Contact
      </button>
      <ContactList
        contacts={contacts}
        onDelete={handleDeleteContact}
        onView={handleViewContact}
        onEdit={handleEditContact}
      />
      {isModalOpen && modalMode !== "view" && (
        <AddEditContactModal
          mode={modalMode}
          contact={selectedContact}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddEditContact}
        />
      )}
      {isModalOpen && modalMode === "view" && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
