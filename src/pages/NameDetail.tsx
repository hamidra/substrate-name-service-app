import { useState } from 'react';
import { useParams } from 'react-router';
import { Card } from 'react-bootstrap';
import NameButtonNavbar from '../components/ButtonNavbar';

const NameDetailsCard = () => {
  return (
    <>
      <form className="p-3">
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">Parent</label>
          <div className="col-sm-8">
            <div>eth</div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">REGISTRANT</label>
          <div className="col-sm-8">
            <div>Not registered</div>
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">CONTROLLER</label>
          <div className="col-sm-8">
            <div>Not owned</div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NameDetailsCard;
