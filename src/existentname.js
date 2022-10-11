function existentName(contacts, newName) {
  return contacts.find(contact => contact.name === newName);
};

export default existentName;