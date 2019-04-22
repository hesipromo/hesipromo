import React from 'react';

import "./HowItWorks.css";
import img1 from './img/testimonials-1.jpg';
import img2 from './img/testimonials-2.jpg';
import img3 from './img/testimonials-3.jpg';

export default () => {
  return (
    <section className="howitworks text-center bg-light">
    <div className="container">
      <h2 className="mb-5">How it works ...</h2>
      <div className="row">
        <div className="col-lg-4">
          <div className="howitworks-item mx-auto mb-5 mb-lg-0">
            <img className="img-fluid rounded mb-3" src={img1} alt=""/>
            <h5>Products you love</h5>
            <p className="font-weight-light mb-0">"Find 1,000's of products on promotion from the stores you already shop at. "</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="howitworks-item mx-auto mb-5 mb-lg-0">
            <img className="img-fluid rounded mb-3" src={img2} alt=""/>
            <h5>Same-day Promotion</h5>
            <p className="font-weight-light mb-0">"We make promotions in cities like Harare, Bulawayo and many more."</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="howitworks-item mx-auto mb-5 mb-lg-0">
            <img className="img-fluid rounded mb-3" src={img3} alt=""/>
            <h5>Save time & money</h5>
            <p className="font-weight-light mb-0">"Find exclusive deals on popular products"</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
