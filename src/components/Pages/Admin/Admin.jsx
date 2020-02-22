import React, { Component } from 'react';
import axios from 'axios';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poptarts: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/poptarts')
      .then(res => this.setState({poptarts: res.data, loading: false}))
      .catch(err => console.log(err))
  }

  productList = () => {
    if(this.state.loading)
      return (<div>Loading...</div>)

    return this.state.poptarts.map(poptart => {
      return (
        <div key={poptart._id} className="poptart-table__item">
          <div className="poptart-table__col"><img src={poptart.imageUrl} className="poptart-table__img" /></div>
          <div className="poptart-table__col">{poptart.flavor}</div>
          <div className="poptart-table__col">{poptart.stock}</div>
          <div className="poptart-table__col">{poptart.price}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="page-header center">
          <h1>Poptarts</h1>
          <button className="button button--new"></button>
        </div>
        <div className="poptart-table">
          <div className="poptart-table__header">
            <div className="poptart-table__col"></div>
            <div className="poptart-table__col">Flavor</div>
            <div className="poptart-table__col">Stock</div>
            <div className="poptart-table__col">Price</div>
          </div>
          
          {this.productList()}
        </div>
      </div>
    ) 
  }
}