import React, { Component } from 'react'
import DetallesDoctor from './DetallesDoctor';
import ServiceHospitales from '../services/ServiceHospitales';

export default class DoctoresComponent extends Component {
    service = new ServiceHospitales();

    state = {
        doctores: [],
        idDoctor: 0
    }

    mostrarDetalles = (iddoc) => {
        this.setState({
            idDoctor: iddoc
        })
    }

    loadDoctoresHospital = () => {
        this.service.getDoctoresHospital(this.props.idhospital).then(result => {
            this.setState({
                doctores: result
            })
        })
    }

    componentDidMount = () => {
        this.loadDoctoresHospital();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idhospital != this.props.idhospital) {
            this.loadDoctoresHospital();
            this.setState({
                idDoctor: 0
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Doctores del Hospital {this.props.idhospital}</h1>
                <table className='table table-primary'>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                            <th>Hospital</th>
                            <th>Mostrar Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.doctores.map((doc, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{doc.apellido}</td>
                                        <td>{doc.especialidad}</td>
                                        <td>{doc.salario}</td>
                                        <td>{doc.idHospital}</td>
                                        <td>
                                            <button onClick={() => this.mostrarDetalles(doc.idDoctor)} className='btn btn-danger'>
                                                Detalles
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    this.state.idDoctor != 0 &&
                    <DetallesDoctor iddoctor={this.state.idDoctor}/>
                }
            </div>
        )
    }
}
