function Contacts({ contacts }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <h1>{contact?.title ? <>{contact?.title}</> : <i>No Name</i>}</h1>
        </li>
      ))}
    </ul>
  );
}

export default Contacts;
