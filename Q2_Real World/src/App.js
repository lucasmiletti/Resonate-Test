import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  //fetch operation
  const fetchContacts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setContacts(data);
  };

  //add operation
  const handleAddContact = () => {
  };

  //edit operation
  const handleEditContact = (id) => {
  };

  //delete operation
  const handleDeleteContact = (id) => {
  };

  return (
    <div className="App">
      <h1>Contacts</h1>
      <button onClick={handleAddContact}>Add Contact</button>

      <div className="contacts">
        {contacts.map((contact) => (
          <div key={contact.id}>
            <h2>{contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <button onClick={handleEditContact(contact.id)}>Edit</button>
            <button onClick={handleDeleteContact(contact.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
