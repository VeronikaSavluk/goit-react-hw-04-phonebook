import { useState, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import ContactForm from './ContactForm';
import FilterContactList from './FilterContactListItem';
import ContactList from './ContactList';

import { Container, Title } from './Container.styled';

function App () {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const fillingOfPhonebook = (newContact) => {
  const { name } = newContact;
  const existentName = contacts.find(contact => contact.name === name);

  if (existentName) {
    alert(`${name} is already in contacts`);
  } else {
    newContact.id = `id-${contactId()}`;
    setContacts([newContact, ...contacts]);
  };
  };

  const contactId = () => contacts.length > 0
    ? Math.max.apply(null, contacts.map(({ id }) => Number(id.replace("id-", "")))) + 1
    : 1;

  const filteredContactList = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }, [filter, contacts]);

  const deleteContact = (needlessContact) =>
    setContacts(() => contacts.filter(contact => contact.id !== needlessContact));

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={fillingOfPhonebook} />
      <Title>Contacts</Title>
      <FilterContactList query={filter} onChange={(e) => setFilter(e.target.value)} />
      <ContactList contacts={filteredContactList}
        onDeleteContact={deleteContact} />
    </Container>
  );
}

export default App;