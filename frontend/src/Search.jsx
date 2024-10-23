import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


export default function Search({onSubmit}) {
    const [text, setText] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(text);
    };

    return (
        <Form onSubmit={handleSubmit}>
        <div className='searchBox'>
          <input
            placeholder=' Type your question here'
            onChange={(evt) => setText(evt.target.value)}
            value={text}
          />
        </div>
        <div className='search-btn'>
          <Button type='submit'>
            <i className="bi bi-search"></i> Submit
          </Button>
        </div>
      </Form>
    );
}
