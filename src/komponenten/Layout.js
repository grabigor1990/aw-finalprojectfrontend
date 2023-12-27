import React from 'react';
import Profilkomponente from './Profil/Profilkomponente.js'
import Balsamkomponente from './Balsam/Balsamkomponente.js'
import Diagrammkomponente from './Diagramm/Diagrammkomponente.js'
import Kryptonitkomponente from './Kryptonit/Kryptonitkomponente.js'
import Stimmungskomponente from './Stimmung/Stimmungskomponente.js'


function Layout(props) {
    return (
        <div className="Layout">
            <Profilkomponente/>
            <Balsamkomponente/>
            <Kryptonitkomponente/>
            <Diagrammkomponente/>
            <Stimmungskomponente/>
        </div>
    );
}

export default Layout;