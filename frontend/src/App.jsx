import React from 'react';

/* Other Component Function Imports */
import ChatBox from './ChatBox';
import MockDataset from './MockDataset';
import FetchKeyValuePairs from './FetchKeyValuePairs.jsx'

/* Styling Imports */
import {Card} from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
/* Import image from assets folder */
import drone from './assets/drone.webp';

export default function App() {
  return (
    <>
    <div className='keyValues'><FetchKeyValuePairs /></div>
    <div className='entireCard'>
      <div><h1 className='pageTitle'>Drone Flight Data</h1></div>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top"
          src={drone}
          style={{ objectFit: 'cover', height: '180px' }}
        />
        <Card.Body>
          <Card.Title>Information Center:</Card.Title>
          <ChatBox />
        </Card.Body>
      </Card>
      <div>
        <MockDataset />
      </div>
    </div>
    </>
  )
}
