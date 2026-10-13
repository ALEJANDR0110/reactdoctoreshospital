import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'

export default class DetallesDoctor extends Component {
    url = Global.urlApiDoctores
    state = {
        doctor: null
    }
    
    loadDoctor = () => {
        let request = "/api/Doctores/" + this.props.iddoctor;
        axios.get(this.url + request).then((response) => {
            this.setState({
                doctor: response.data
            })
            console.log(response.data)
            console.log("adios")
        })
    }

    componentDidMount = () => {
        this.loadDoctor();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.iddoctor !== this.props.iddoctor) {
            this.loadDoctor()
        }
    }
    render() {
        return (
            <div>
                <h1>Detalles del Doctor {this.props.iddoctor}</h1>
                {
                this.state.doctor !== null &&
                <div>
                    <h3>Apellido: {this.state.doctor.apellido}</h3>
                    <h3>Especialidad: {this.state.doctor.especialidad}</h3>
                    <h3>Salario: {this.state.doctor.salario}</h3>
                </div>
                }
            </div>
        )
    }
}
