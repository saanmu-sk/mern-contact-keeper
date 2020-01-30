import React, { useReducer } from 'react'
import uuid from 'uuid'

import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: '1',
                name: 'Saanmu',
                email: 'sk@gmail.com',
                phone: '9876544321',
                type: 'personal'
            },
            {
                id: '2',
                name: 'Sk',
                email: 'saanmu@gmail.com',
                phone: '123456789',
                type: 'professional'
            }
        ]
    }
    
    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4()
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }
    // Delete contact

    // Set current contact

    // Clear current contact

    // Update contact

    // Filter contacts

    // Clear filters

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState