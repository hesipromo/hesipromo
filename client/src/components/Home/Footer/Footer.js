import React from 'react';

import "./Footer.css";

export default () => {
  return (
      <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
  
            <div className="col-lg-4 col-md-6 footer-info">
              <h3>Hesi Promo</h3>
            </div>
  
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>HesiPromo</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Customer Support</a></li>
              </ul>
            </div>
  
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Follow Us</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
  
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Cities</h4>
              <ul>
                <li><a href="#">Harare</a></li>
                <li><a href="#">Bulawayo</a></li>
                <li><a href="#">Mutare</a></li>
                <li><a href="#">Gweru</a></li>
                <li><a href="#">Chitungwiza</a></li>
                <li><a href="#">Marondera</a></li>
                <li><a href="#">Promotion Near Me</a></li>
              </ul>
            </div>
  
          </div>
        </div>
      </div>
  
      <div className="container">
        <div className="copyright">
        &copy; {new Date().getFullYear()} HesiPromo<span> Terms</span><span> Privacy</span>
        </div>
      </div>
    </footer>
  );
};
