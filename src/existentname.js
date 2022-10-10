function existentName(contacts, newName) {
  contacts.find(contact => contact.name === newName);
};

export default existentName;