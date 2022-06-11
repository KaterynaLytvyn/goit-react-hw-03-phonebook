import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = (props) => {

    const { contacts, onDeleteContact } = props;

    return (
        <ul className={s.list}>
            {contacts.map(contact=><li key={contact.id} className={s.item}>{contact.name} : {contact.number} <button className = "button" type="button" onClick={() => onDeleteContact(contact.id)}>Delete</button></li>)}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func.isRequired,
  };

export default ContactList;