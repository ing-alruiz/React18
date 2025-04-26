import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';

const CicloVidaFuncional = ({ propiedad = 'Valor por defecto definido para la propiedad' }) => {
    const [estado, setEstado] = useState('Inicializado en el constructor');

    // Simula componentDidMount y componentWillUnmount
    useEffect(() => {
        console.log('Se ejecuta componentDidMount');

        return () => {
            console.log('Se desmonta el componente...');
        };
    }, []);

    // Simula componentWillReceiveProps
    useEffect(() => {
        console.log('Se ejecuta componentWillReceiveProps con las propiedades futuras', propiedad);
    }, [propiedad]);

    // Simula shouldComponentUpdate
    const shouldComponentUpdate = (nextEstado) => {
        console.log('Ejecutando shouldComponentUpdate. Próximo estado: ', nextEstado);
        return true; // Devuelve un booleano
    };

    // Simula componentWillUpdate
    useEffect(() => {
        console.log('Ejecutando componentWillUpdate. Estado actual: ', estado);
    }, [estado]);

    return (
        <div>
            <p>Componente del ciclo de vida</p>
            <p>Estado: {estado}</p>
            <p>Propiedad: {propiedad}</p>
        </div>
    );
};

export default CicloVidaFuncional;