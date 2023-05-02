/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import PruebaComponente from './components/PruebaComponente'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>*/}
      </div>
      <h1>Registro de llamados</h1>
      <PruebaComponente />
      <div className="aside">
        <table className='table table'>
          <tr>
            <th> Hora</th>
            <th> Cuarto</th>
            <th> Código</th>
            <th> Responsable</th>
            <th> Desactivó</th>
            <th> Tiempo</th>
          </tr>
          <tbody>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            <tr>
              <td> 10:30 </td>
              <td> 301 </td>
              <td> azul </td>
              <td> María </td>
              <td> Dr Andrés</td>
              <td> 18</td>
            </tr>
            

          </tbody>
        </table>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
