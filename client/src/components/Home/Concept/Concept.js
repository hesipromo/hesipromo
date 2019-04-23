import React from 'react';

import "./Concept.css";

export default ()=>{
return(
    <section className="showcase">
    <div className="container-fluid p-0">
      <div className="row no-gutters">

        <div className="col-lg-6 order-lg-2 text-white showcase-img-1"></div>
        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
          <h2>Discover Businesses running promotions in your city.</h2>
          <p className="lead mb-0">Browse local restaurants and businesses available for delivery by entering your address below!</p>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6 text-white showcase-img-2" ></div>
        <div className="col-lg-6 my-auto showcase-text">
          <h2>Deals that delight</h2>
          <p className="lead mb-0">Saving money on HesiPromo is easy. Find exclusive coupons on hundreds of items!</p>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6 order-lg-2 text-white showcase-img-3"></div>
        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
          <h2>Save Time &amp; Save Money</h2>
          <p className="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>
        </div>
      </div>
    </div>
  </section>
);
};