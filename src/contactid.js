const contactId = (contacts) => contacts.length > 0
    ? Math.max.apply(null, contacts.map(({ id }) => Number(id.replace("id-", "")))) + 1
    : 1;

export default contactId;