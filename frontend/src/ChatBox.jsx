import { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

export default function ChatBox() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query}),
            });
            const data = await res.json();
            if(res.ok) {
                setResponse(data.answer);
            } else {
                setResponse(`Error: ${data.error}`);
            }
        } catch(err) {
            setResponse("Error getting the info you've requested. Try again.")
        }
    }

    return (
        <div className="chat-ui">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your question here and press submit!"
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            <i className="bi bi-search"></i> Submit
          </Button>
        </Form>
        <ListGroup className="mt-3">
          <ListGroup.Item> {response} </ListGroup.Item>
        </ListGroup>
      </div>
    )
}
