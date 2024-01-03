import React, {useState} from "react";
import axios from "axios";
import Modal from "react-modal";
import './navbar.css'


const ProfilBearbeiten = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        benutzerName: '',
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
            console.error('Fehler bei der Änderung', error);
        }
    };
    return (
        <Modal
            className = "container-profilBearbeitung"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Registrierung"

        >
            <h2>Benutzer name ändern</h2>
            <form>
                <input
                    className="inputBenutzerName"
                    type="text"
                    name="benutzerName"
                    placeholder="Neue Benutzername"
                    value={formData.benutzerName}
                    onChange={handleInputChange}
                />

                <input
                    className="inputBenutzerName"
                    type="text"
                    name="vorname"
                    placeholder="Neue Vorname"
                    value={formData.vorname}
                    onChange={handleInputChange}
                />
                <input
                    className="inputBenutzerName"
                    type="text"
                    name="nachname"
                    placeholder="Neue Nachname"
                    value={formData.nachname}
                    onChange={handleInputChange}
                />
                <p className="bearbeitung-geschlecht">Geschlecht</p>
                <select name="geschlecht"
                        id="geschlecht1"
                        value={formData.geschlecht}
                        onChange={handleInputChange}>
                    <option value="keine angabe">Keine Angabe</option>
                    <option value="mannlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                    <option value="diverse">Diverse</option>
                </select>
                <br/>
                <button className={'bearbeitung-button'} type="button" onClick={handleSubmit}>
                    Daten ändern
                </button>
            </form>
        </Modal>
    );
};

export default ProfilBearbeiten;