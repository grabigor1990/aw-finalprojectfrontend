import './App.css';
import Layout from './komponenten/Layout.js'
import Navbar from "./komponenten/Navbar/Navbar";
import LoginForm from "./komponenten/LoginUndRegistrierung/LoginForm";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const handleLogin = async (credentials) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/einloggen', credentials);
            console.log('Anmeldung erfolgreich!', response.data);
            setLoggedIn(true);
        } catch (error) {
            console.error('Fehler beim Login: ', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stimmungen');
                console.log(response.status);
                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    console.error(`Unexpected status code: ${response.status}`);
                    setLoggedIn(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log('Login erforderlich');
                    setLoggedIn(false);
                } else {
                    console.error('Error checking authentication status: ', error.message);
                    setLoggedIn(false);
                }
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
    }, []);

    const renderContent = () => {
        if (isLoggedIn) {
            return <Layout/>;
        } else {
            return <LoginForm onLogin={handleLogin}/>;
        }
    };


    return (
        <>
            <div>
                {renderContent()}
            </div>
            {/*<Navbar/>*/}
        </>
    );
}

export default App;
