/**
 * Form.js
 */

import React from "react";

/**
 * this component will create a fropdown with owners data
 */
const ChooseOwner =(props)=>{
    const options=props.ownerDataIN.map((row) => {
        return <option>{row.name}</option>
    })
    return(
        <select className="form-select" onChange={props.choosedOwnerOUT} >
            <option value="" >Choose an owner, please</option>
            {/* a lista de options */}
            {options}
        </select>
    )
}

class Form extends React.Component {
    newAnimal = {
        animalName: "",
        animalSpecie: "",
        animalBreed: "",
        animalWeight: "",
        animalPhoto: null,
        animalOwnerFK: "",
    }

    state = this.newAnimal;

    /**
     * function to handle data provided by 'input' field
     * @param {*} event 
     */
    handleAdd = (event) => {
        // read the data avaiable at 'event'
        const { name, value } = event.target
        //assign to the state identified by 'name' whith the 'value' writed by user
        this.setState({
            [name]: value,
        })
    }

    /**
     * read the selected owner
     * @param {*} event 
     */
    handleDonoChange=(event)=>{
        this.setState({animalOwnerFK: event.target.value});
    }

    /**
     * add te photo file to state
     * @param {*} event 
     */
    handlePhotoChange=(event)=>{
        this.setState({animalPhoto: event.target.files[0]})
    }

    /**
     * sends data collect by the row to API
     * @param {*} event 
     */
    handleForm=(event)=>{
        // this statement  will prevent Form to submit do Server the data
        event.preventDefault();

        // specefy and object to transport data to API
        let formData={
            Name: this.state.animalName,
            Specie: this.state.animalSpecie,
            Breed: this.state.animalBreed,
            Weight: this.state.animalWeight,
            uploadPhoto: this.state.animalPhoto,
            Owner: this.state.animalOwnerFK,
        }

        //export data to App
        this.props.newAnimalOUT(formData);
    }

    render() {
        const { animalName, animalWeight, animalSpecie, animalBreed } = this.state;
        const {ownersIN} = this.props;
        return (
            <form method="POST" encType="multipart/form-data" onSubmit={this.handleForm} >
                <div className="row">
                    <div className="col-md-4">
                        Name: <input type="text"
                            required
                            className="form-control"
                            name="animalName"
                            value={animalName}
                            onChange={this.handleAdd} /><br />
                        Weight: <input type="text"
                            required
                            className="form-control"
                            name="animalWeight"
                            value={animalWeight}
                            onChange={this.handleAdd} />
                    </div>
                    <div className="col-md-4">
                        Specie: <input type="text"
                            required
                            className="form-control"
                            name="animalSpecie"
                            value={animalSpecie}
                            onChange={this.handleAdd} /><br />
                        Breed: <input type="text"
                            required
                            className="form-control"
                            name="animalBreed"
                            value={animalBreed}
                            onChange={this.handleAdd} />
                    </div>
                    <div className="col-md-4">
                        Photo: <input type="file"
                            required
                            name="animalPhoto"
                            accept=".jpg,.png"
                            className="form-control" 
                            onChange={this.handlePhotoChange}
                            /><br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
                        - dadosDonos: serve para introduzir no componente a lista dos donos a representar na dropdown
                        - idDonoEscolhido: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                          que será entregue ao 'handlerDonoChange' */}
                        Owner: <ChooseOwner ownerDataIN={ownersIN}
                            choosedOwnerOUT={this.handleDonoChange} />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Add new animal" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Form;