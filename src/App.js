import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: É uma parte da aplicação. É usado também para isolar o código repetitivo (algo usado muitas vezes) sem prejudicar o funcionamento da aplicação
//             Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Atributo de um componente
//              Informações que um componente PAI passa para o componente FILHO. Pode ser passado string, uma variável do Javascript (entre {}), booleano, etc...
// Estado: Informações mantidas pelo componente (Lembrar: Imutabilidade)

//import Header from './Header';

// Fragment = <>. Não usar <div> pois pode prejudicar a estilização
// Imutabilidade = nunca vai alterar o dado. Vai criar uma nova variável baseada no valor da antiga variável
function App() {

  // const [counter, setCounter] = useState(0);

  // function incrementCounter() {
  //   setCounter(counter + 1);
  // }

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    // <> 
    //   <h1>Contador: {counter}</h1>
    //   <button onClick={incrementCounter}>Incrementar</button>
    // </>

    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>

  );
}

export default App;
