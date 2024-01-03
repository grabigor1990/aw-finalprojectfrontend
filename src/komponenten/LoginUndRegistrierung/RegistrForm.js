import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './login-register.css';

const RegisterModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        benutzerName: '',
        passwort1: '',
        passwort2: '',
        vorname: '',
        nachname: '',
        geschlecht: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/registrieren', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Fehler bei der Registrierung', error);
        }
    };

    return (
        <Modal
            className = "modal"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Registrierung"

        >
            <h2 className='modalFenster'>Neues Konto erstellen</h2>
            <form>
                <input
                    className="inputLoginModal"
                    type="text"
                    name="benutzerName"
                    placeholder="Benutzername"
                    value={formData.benutzerName}
                    onChange={handleInputChange}
                />
                <input
                    className="inputLoginModal"
                    type="password"
                    name="passwort1"
                    placeholder="Passwort"
                    value={formData.passwort1}
                    onChange={handleInputChange}
                />
                <input
                    className="inputLoginModal"
                    type="password"
                    name="passwort2"
                    placeholder="Passwort wiederholen"
                    value={formData.passwort2}
                    onChange={handleInputChange}
                />
                <input
                    className="inputLoginModal"
                    type="text"
                    name="vorname"
                    placeholder="Vorname"
                    value={formData.vorname}
                    onChange={handleInputChange}
                />
                <input
                    className="inputLoginModal"
                    type="text"
                    name="nachname"
                    placeholder="Nachname"
                    value={formData.nachname}
                    onChange={handleInputChange}
                />
                <p className="geschlecht">Geschlecht</p>
                <select name="geschlecht"
                        id="geschlecht"
                        value={formData.geschlecht}
                        onChange={handleInputChange}>
                    <option value="keine angabe">Keine Angabe</option>
                    <option value="mannlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                    <option value="diverse">Diverse</option>
                </select>
                <br/>
                <button className={'modal-button'} type="button" onClick={handleSubmit}>
                    Konto erstellen
                </button>
            </form>
        </Modal>
    );
};

export default RegisterModal;