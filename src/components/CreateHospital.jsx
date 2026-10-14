import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import ServiceHospitales from '../services/ServiceHospitales';

export default class CreateHospital extends Component {
    service = new ServiceHospitales();

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTelefono = React.createRef();
    cajaCamas = React.createRef();

    state = {
        mensaje: "",
        status: false
    }

    insertHospital = (event) => {
        event.preventDefault();
        let hospital = {
            idHospital: parseInt(this.cajaId.current.value),
            nombre: this.cajaNombre.current.value,
            direccion: this.cajaDireccion.current.value,
            telefono: this.cajaTelefono.current.value,
            camas: parseInt(this.cajaCamas.current.value),
        }

        this.service.insertHospital(hospital).then((result) => {
            this.setState({
                status: true
            })
        })        
    }

    render() {
        return (
            <div>
                {
                    this.state.status &&
                    (
                        <Navigate to="/hospitales" />
                    )
                }
                <h1>Create Hospital</h1>
                <h3 style={{color: "fuchsia"}}>
                    {this.state.mensaje}
                </h3>
                <form>
                    <label>Id hospital</label>
                    <input type="number"  ref={this.cajaId} className='form-control' />
                    <label>Nombre:</label>
                    <input type="text"  ref={this.cajaNombre} className='form-control' />
                    <label>Direccion</label>
                    <input type="text"  ref={this.cajaDireccion} className='form-control' />
                    <label>Telefono: </label>
                    <input type="text"  ref={this.cajaTelefono} className='form-control' />
                    <label>Camas: </label>
                    <input type="number"  ref={this.cajaCamas} className='form-control' />
                    <button onClick={this.insertHospital} className='btn btn-warning' >
                        Create
                    </button>
                </form>
            </div>
        )
    }
}
