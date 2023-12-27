import './App.css';
import Layout from './komponenten/Layout.js'
import Navbar from "./komponenten/Navbar/Navbar";
import TemporaererLogin from "./komponenten/TemporaererLogin";

function App() {
    return (
        <>
            <Navbar/> <br/> <br/>
            <TemporaererLogin/>
            <Layout/>
        </>
    );
}

export default App;
