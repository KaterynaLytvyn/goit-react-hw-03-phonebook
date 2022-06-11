import React from "react";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";
import ContactList from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid'

class App extends React.Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  addContact = contact => {

    if(this.state.contacts.some(c => c.name ===contact.name)) {
      alert(contact.name +' is already in contacts')
      return
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }))
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !==contactId)
    }))
  }

  handleChange = event => {
    this.setState({filter: event.currentTarget.value})
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();

    const result = contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter))
    return result;
  }

  render() {
    const { filter } = this.state
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange}/>
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
      </div>
    )
  }

}

export default App;
