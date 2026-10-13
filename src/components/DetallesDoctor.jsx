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
    render() {
        return (
            <div>
                <h1>Detalles del Doctor {this.props.iddoctor}</h1>
            </div>
        )
    }
}
