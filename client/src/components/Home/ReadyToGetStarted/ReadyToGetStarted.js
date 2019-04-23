import React from 'react';

import "./ReadyToGetStarted.css";

export default () => {
  return (
    <section className="call-to-action text-white text-center">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-xl-9 mx-auto">
          <h2 className="mb-4">Ready to enjoy Discounts?</h2>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
          <form>
            <div className="form-row">
              <div className="col-12 col-md-9 mb-2 mb-md-0">
                <input type="text" className="form-control form-control-lg" placeholder="Enter your city..."/>
              </div>
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-block btn-lg">Find Promos!</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  );
};
