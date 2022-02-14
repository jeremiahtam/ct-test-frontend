import React from 'react';
import { Container, Navbar, Tabs, Tab, Image, Row, Col } from 'react-bootstrap'

const TabContentTwo = () => {
  return (
    <div className='tab-two-content'>
      <Container>
        <div className='text-box'>
          <div className='text-box-heading'>SCHEDULE</div>
          <div className='row'>
            <div className='col-md-4'>25 Nov 2016</div>
            <div className='col-md-8'>Vestibulum viverra</div>
          </div>
          <p>
            <div className='row'>
              <div className='col-md-4'>28 Nov 2016</div>
              <div className='col-md-8'>Vestibulum viverra</div>
            </div>
          </p>
          <p>
            <div className='row'>
              <div className='col-md-4'>28 Dec 2016</div>
              <div className='col-md-8'>Vestibulum viverra</div>
            </div>
          </p>
          <p>
            <div className='row'>
              <div className='col-md-4'>7 Jan 2017</div>
              <div className='col-md-8'>Vestibulum viverra</div>
            </div>
          </p>
        </div>
      </Container>
    </div>
  );
}
export default TabContentTwo