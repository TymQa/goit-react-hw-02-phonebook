import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import MainTitle from './MainTitle/MainTitle';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContacts = (name, number) => {
    const showAlert = true;
    const similarElement = element => element.name === name;
    if (

      this.state.contacts.some(similarElement)
    ) {
      alert(name + ' is already in contacts.');
      return showAlert;
    }

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
    }));
  };

  handlerInputFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  handlerButtonDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  render() {
    const filterContacts = this.filterContacts();
    return (
      <div className="container">
        <MainTitle title="Phonebook" />
        <ContactForm addNewContacts={this.addNewContacts} />
        <MainTitle title="Contacts" />
        <Filter
          onChange={this.handlerInputFilter}
          filterValue={this.state.filter}
        />
        <ContactList
          contacts={filterContacts}
          onButtonDelete={this.handlerButtonDelete}
        />
      </div>
    );
  }
}