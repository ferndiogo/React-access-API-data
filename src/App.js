/**
 * App.js
 */

import React from "react";
import Table from "./Table";
import Form from "./Form";

/**
 * read the animals data from API
 * to acess data, is necessary to create a PROXY
 */
async function getAnimals() {
  let animalsData = await fetch("api/AnimalsAPI");
  //avaliate the data collected
  if (!animalsData.ok) {
    //ok, mean HTTP code: 200
    console.error(animalsData);
    throw new Error("Something went wrong when acessing animals data, HTTP code: ", animalsData.state);
  }
  //return the collected data, in JSON format
  return await animalsData.json();
}

/**
 * read the owners data from API
 * to acess data, is necessary to create a PROXY
 */
async function getOwners() {
  let ownersData = await fetch("api/ownersAPI");
  //avaliate the data collected
  if (!ownersData.ok) {
    //ok, mean HTTP code: 200
    console.error(ownersData);
    throw new Error("Something went wrong when acessing owners data, HTTP code: ", ownersData.state);
  }
  //return the collected data, in JSON format
  return await ownersData.json();
}

/**
 * this function is the function that really sends new animal data to API
 * @param {*} animal 
 */
async function AddAnimal(animal){
  
}

class App extends React.Component {
  state = {
    animals: [],
    owners: [],
  }

  /**
   * this function acts like a 'startup' whe the component is started
   */
  componentDidMount() {
    this.LoadAnimals();
    this.LoadOwners();
  }

  /**
   * load the Animals data, from API
   */
  async LoadAnimals() {
    try {
      //ask for data, from API
      let animalsFromAPI = await getAnimals();
      //after receiving data, store it at state
      this.setState({ animals: animalsFromAPI })
    } catch (ex) {
      console.error("Erro: it was not possible to read animals data", ex)
    }
  }

  /**
   * load the Owners data, from API
   */
  async LoadOwners() {
    try {
      //ask for data, from API
      let ownersFromAPI = await getOwners();
      //after receiving data, store it at state
      this.setState({ owners: ownersFromAPI })
    } catch (ex) {
      console.error("Erro: it was not possible to read owners data", ex)
    }
  }

  /**
   * send the new animal data to API
   * @param {*} animal 
   */
  handleNewAnimalData = async (animal) => {
    try {
      await AddAnimal(animal);
    } catch (error) {
      console.error("Smothing wrong  when a new animal was sento to API", ex)
    }
    await this.LoadAnimals();
  }

  render() {
    const { animals, owners } = this.state;
    return (
      <div className="container">
        <h1>Animals</h1>
        <h4>New Animal:</h4>
        <Form ownersIN={owners} newAnimalOUT={this.handleNewAnimalData} />
        <br />
        <h4>Animals list</h4>
        <Table animalsDataIN={animals} />
      </div>
    )
  }

}

export default App;
