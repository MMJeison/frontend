import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function FormularioCancelacion() {


  //Carga las materias de un estudiante
  const [materias, setMaterias] = useState([])

  const fetchData = () => {
    return axios.get('http://localhost:8080/api/materia/find-all')
      .then((response) => {
        setMaterias(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  //--------------------------------------

  //Envia los datos de una solicitud al backend
  const [idMateria, setIdMateria] = useState(null)
  const [motivo, setMotivo] = useState('')
  
  const handleCheckboxChange = (event, key) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setIdMateria(key)
    } else {
      setIdMateria(null)
    }
  }


  async function cancelacionCurso(event) {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8080/api/cancel-courses-api",
        {
          idMateria: idMateria,
          motivo: motivo,
        }).then((response) => {
          //toast.error('Usuario o contraseña incorrectos')
          console.log(response.data) 
        }, fail => {
          console.error(fail)
        })
    } catch (error) {
      alert(error)
    }
  }
  //--------------------------------------

  return (
    <>
      <div className='cancellation_form'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Materia</th>
              <th>Apocope</th>
              <th>Creditos</th>
              <th>Grupos</th>
              <th>Correquisitos</th>
              <th>% evaluado</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {
              materias.length > 0 && materias.map(materia => (
                <tr key={materia.idMateria}>
                  <td>
                    <input type='checkbox' 
                      onChange={(event) => handleCheckboxChange(event, materia.idMateria)}
                      checked={idMateria === materia.idMateria}
                    />
                  </td>
                  <td>{materia.nombre}</td>
                  <td>202568</td>
                  <td>{materia.creditos}</td>
                  <td>05</td>
                  <td>NA</td>
                  <td>60</td>
                  <td>2.3</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
        <textarea
          className='text-area'
          placeholder='Ingresa la Justificación.'
          required
          value={motivo}
            onChange={(event) => {
              setMotivo(event.target.value);
            }}
        ></textarea>
        <div className='button-container'>
          <button className='send-button' disabled={!idMateria} onClick={cancelacionCurso}>Enviar Cancelación</button>
        </div>
      </div>
    </>
  )
}
