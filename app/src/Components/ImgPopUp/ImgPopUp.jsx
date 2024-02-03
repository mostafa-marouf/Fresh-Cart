import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ImgPopUp({ele}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    

     
        <div   onClick={handleShow} className='mt-2 col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-sm-12  '>
          <div className=' cursor-pointer card'>
            <div className=" card-img">
              <img src={ele.image} height={200} className='w-100' style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px", objectFit: 'cover' }} alt={ele.slug} />
            </div>
            <div className='  card-body'>
              <h1 className=' h4 card-title'>{ele.name}</h1>
            </div>
          </div>
        </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <img src={ele.image} height={500} className='w-100' style={{ objectFit: 'cover' }} alt={ele.slug} />
        </Modal.Body>
      </Modal>

       
    

    </>
  );
}

export default ImgPopUp;