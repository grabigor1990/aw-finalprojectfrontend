import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './login-register.css';

Modal.setAppElement(document.body);

const RegisterModal = ({isOpen, onRequestClose}) => {
    const [formData, setFormData] = useState({
        benutzerName: '',
        passwort1: '',
        passwort2: '',
        vorname: '',
        nachname: '',
        geschlecht: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 2000);

        return () => clearTimeout(timer);
    }, [errorMessage, successMessage]);

    const handleSubmit = async () => {
        if (formData.benutzerName.length < 2) {
            setErrorMessage('Der Benutzername muss länger als 2 sein.');
            return;
        }
        if (formData.vorname.length < 2 || formData.nachname.length < 2) {
            setErrorMessage('Vorname und Nachname muss länger als 2 sein.');
            return;
        }
        if (formData.passwort1.length < 6 || formData.passwort2.length < 6) {
            setErrorMessage('passwort muss länger als 6 sein.');
            return
        }

        try {
            const response = await axios.post('http://localhost:8080/registrieren', formData);
            console.log(response.data);
            setSuccessMessage('Erfolgreich registriert!');
            onRequestClose();
        } catch (error) {
            console.error('Fehler bei der Registrierung', error);
            setErrorMessage('Fehler bei der Registrierung');
        }
    };

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="RegistrForm Modal"
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
                    tabIndex={2}
                />
                <input
                    className="inputLoginModal"
                    type="password"
                    name="passwort2"
                    placeholder="Passwort wiederholen"
                    value={formData.passwort2}
                    onChange={handleInputChange}
                    tabIndex={3}
                />
                <input
                    className="inputLoginModal"
                    type="text"
                    name="vorname"
                    placeholder="Vorname"
                    value={formData.vorname}
                    onChange={handleInputChange}
                    tabIndex={4}
                />
                <input
                    className="inputLoginModal"
                    type="text"
                    name="nachname"
                    placeholder="Nachname"
                    value={formData.nachname}
                    onChange={handleInputChange}
                    tabIndex={5}
                />
                <p className="geschlecht">Geschlecht</p>
                <select name="geschlecht"
                        id="geschlecht"
                        value={formData.geschlecht}
                        onChange={handleInputChange}
                        tabIndex={6}
                >
                    <option value="keine angabe">Keine Angabe</option>
                    <option value="mannlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                    <option value="diverse">Diverse</option>
                </select>
                <br/>
                <button
                    className={'modal-button'}
                    type="button"
                    onClick={handleSubmit}
                    tabIndex={7}
                >
                    Konto erstellen
                </button>
                {errorMessage && <p className={"error-message"}>{errorMessage}</p>}
                {successMessage && <p className={"success-message"}>{successMessage}</p>}
            </form>
        </Modal>
    );
};

export default RegisterModal;