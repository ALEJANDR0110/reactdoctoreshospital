import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import DetallesDoctor from './DetallesDoctor';

export default class DoctoresComponent extends Component {
    url = Global.urlApiDoctores;

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
        let request = "api/doctores/doctoreshospital/" + this.props.idhospital;

        axios.get(this.url + request).then((response) => {
            console.log("Leyendo doctores")
            this.setState({
                doctores: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDoctoresHospital();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idhospital != this.props.idhospital) {
            this.loadDoctoresHospital();
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
                                        <td><button onClick={() => this.mostrarDetalles(doc.idDoctor)}>Detalles</button></td>
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
