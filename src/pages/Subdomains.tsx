import { useState } from 'react';
import { useParams } from 'react-router';
import { Card } from 'react-bootstrap';
import NameButtonNavbar from '../components/ButtonNavbar';

const SubdomainsCard = () => {
  let { name } = useParams();
  return (
    <>
      <form>
        <div className="row p-5">
          <div className="col-12 d-flex justify-content-center pe-3">
            <p>{`${name} has no subdomains`}</p>
          </div>
          <div className="col-12 d-flex justify-content-center pe-3">
            <button className="btn btn-outline-primary">Add subdomains</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SubdomainsCard;
