import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Asignaturas = () => {
  //Borrar
  const asignaturas = [
    { nombre: 'Matemáticas', codigo: 'MAT101', grupo: '5' },
    { nombre: 'Historia', codigo: 'HIS201', grupo: '2' },
    { nombre: 'Ciencias de la Computación', codigo: 'CSC301', grupo: '1' }
  ]

  const [materias, setMaterias] = useState([])
  const [idMateria, setIdMateria] = useState([])

  const userState = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const cargarMaterias = async () => {
    return axios
      .get('http://localhost:8080/api/profesor-materia/find-all-by-documento-profesor/' +
        userState.documentoProfesor)
      .then((response) => { setMaterias(response.data) })
      .catch((error) => { console.log(error) })
  }

  useEffect(() => {
    cargarMaterias()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  }
  return (
    <Slider {...settings} className='teacher_signatures'>
      {materias.length > 0 &&
        materias.map((curso, _) => (
          <NavLink
            to={'/docenteRevisionCancelaciones/' + curso.idMateria}
            key={curso.idMateria}
            className='links'
          >
            <div className='slider_inner_block_teacher'>
              <h3>{curso.materia.nombre}</h3>
              <h5>Código: {curso.materia.codigo}</h5>
              <h5>Grupo: {curso.grupo}</h5>
            </div>
          </NavLink>
        ))}
    </Slider>
  )
}

export default Asignaturas
