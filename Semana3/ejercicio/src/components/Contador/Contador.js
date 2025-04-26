import React, { useState, useEffect, use } from 'react';

const Contador = () => {
    const [contador, setContador] = useState(0);
    const [otroContador, setOtroContador] = useState(0);

    useEffect(() => {
        console.log('Sin Parentecis');
    }); 

    useEffect(() => {
        console.log('Con Parentecis');
    },[]); 

    useEffect(() => {
        console.log('El componente se ha montado o actualizado el otroContador:', otroContador);
        // return () => {
        //     console.log('El componente se va a desmontar o actualizar');
        // };
    }, [otroContador]); 

    useEffect(() => {
        console.log('El componente se ha montado o actualizado el contador:', contador);
        if (contador > 3) {
            setOtroContador(otroContador + 1);
        }
        // return () => {
        //     console.log('El componente se va a desmontar o actualizar');
        // };
    }, [contador]); // Dependencia: el efecto se ejecuta cuando cambia el contador

    return (
        <div>
            <p>Contador: {contador}</p>
            <button onClick={() => setContador(contador + 1)}>Incrementar</button>
            <button onClick={() => setContador(contador - 1)}>Decrementar</button>
        </div>
    );
};

export default Contador;