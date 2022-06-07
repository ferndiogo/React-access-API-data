/**
 * App.js
 */

import React from "react";
import Table from "./Table";

/**
 * read the animals data from API
 * to acess data, is necessary to create a PROXY
 */
async function getAnimals(){
  let animalsData = await fetch("api/AnimalsAPI");
  //avaliate the data collected
  if(!animalsData.ok){
    //ok, mean HTTP code: 200
    console.error(animalsData);
    throw new Error("Something went wrong when acessing animals data, HTTP code: ", animalsData.state);
  }
  //return the collected data, in JSON format
  return await animalsData.json();
}

class App extends React.Component{
  state={
    animals:[]
  }

  /**
   * this function acts like a 'startup' whe the component is started
   */
  componentDidMount(){
    this.LoadAnimals();
  }

  /**
   * load the Animals data, from API
   */
  async LoadAnimals(){
    try {
      //ask for data, from API
      let animalsFromAPI = await getAnimals();
      //after receiving data, store it at state
      this.setState({ animals:animalsFromAPI })
    } catch (ex) {
      console.error("Erro: it was not possible to read animals data", ex)
    }
  }

  render(){
    const {animals}=this.state;
    return(
      <div className="container">
        <h1>Animals</h1>
        {/* <h4>New Animal:</h4>
        <Form /> */}
        <h4>Animals list</h4>
        <Table animalsDataIN={animals}/>
      </div>
    )
  }

}

export default App;
