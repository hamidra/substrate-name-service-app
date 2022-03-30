import { Modal, Spinner } from 'react-bootstrap';
export default function Processing({ show, message }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Body>
          <div
            style={{ height: '100px' }}
            className="d-flex flex-column justify-content-around align-items-center"
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Processing...</span>
            </Spinner>
            <div>{message}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
