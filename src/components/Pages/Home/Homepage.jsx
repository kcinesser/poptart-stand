import React, { Component } from 'react';
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poptarts: [],
      loading: true,
      activePoptart: null,
      showDetails: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/poptarts')
      .then(res => { this.setState({poptarts: res.data, loading: false}) })
      .catch(err => console.log(err))
  }

  handleModal = (poptart = '') => {
    this.setState({
      showDetails: !this.state.showDetails,
      activePoptart: poptart
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  poptartList = () => {
    if(this.state.loading)
      return(<div>Loading...</div>)

    return this.state.poptarts.map(poptart => {
      return (
        <div className="poptart-card" key={poptart._id}>
          <img src={poptart.imageUrl} />
          { poptart.stock === 0 ? 
            <div class="poptart-card__stock-warning">Out of Stock</div>
          :
           ''
          }
          <button className="button button--text" onClick={() => this.handleModal(poptart)}>
            <div className="button--text__inner">{poptart.flavor}</div>
          </button>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="page-hero">
          <h2>Firespring</h2>
          <h1 className="logo">Poptart Stand</h1>
        </div>
        <div className="poptart-container">
          {this.poptartList()}
        </div>
        { this.state.showDetails ?
          <Modal poptart={this.state.activePoptart} onClose={this.handleModal} />
        :
          ''
        }
      </div>
    )
  }
}

Homepage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Homepage);

class Modal extends Component {
  render() {
    return (
      <div className="modal-background">
        <button className="button button--close" onClick={this.props.onClose}></button>
        <div className="modal-content">
          <h2>{this.props.poptart.flavor}</h2>
          <p>Stock: {this.props.poptart.stock}</p>
          <p>Price: ${this.props.poptart.price}</p>
        </div>
      </div>
    )
  }
}