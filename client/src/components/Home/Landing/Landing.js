import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import "./Landing.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <header className="masthead text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">Never miss a promotion, discount from your favourite Stores!</h1>
              </div>
              <div className="col-xl-6 mx-auto">
                <h3 className="mb-5">Food, drinks and grcoeries promos up for grabs.</h3>
              </div>
              
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form>
                  <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                      <input type="email" className="form-control form-control-lg" placeholder="Enter your city"/>
                    </div>
                    <div className="col-12 col-md-3">
                      <button type="submit" className="btn btn-block btn-lg">Find Promos</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
