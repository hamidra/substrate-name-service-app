import { useState } from 'react';
import { useParams } from 'react-router';
import { Card } from 'react-bootstrap';
import NameButtonNavbar from '../components/ButtonNavbar';

const NameDetailsCard = () => {
  return (
    <>
      <form className="p-sm-5 fw-light fs-4">
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Parent</label>
          <div className="col-sm-10">
            <div>.dot</div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">REGISTRANT</label>
          <div className="col-sm-10">
            <div>Not registered</div>
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">CONTROLLER</label>
          <div className="col-sm-10">
            <div>Not owned</div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NameDetailsCard;
