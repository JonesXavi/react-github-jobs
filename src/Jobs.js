import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Image } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Jobs({ job }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card className="card-item">
      <div>
        <a href={job.company_url}>
          <Image alt={job.company_logo} src={job.company_logo} className="company-logo" />
        </a>
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>{job.title} - <span className="text-muted font-weight-light">{ job.company }</span></Card.Title>
            <Badge variant="secondary" className="mr-2 badge-pill">{job.type}</Badge>
            <Badge variant="secondary" className="badge-pill">{job.location}</Badge>
            <Card.Subtitle style={{margin: '10px 0'}}>Apply</Card.Subtitle>
            <div style={{ wordBreak: 'break-all'}}>
              <ReactMarkdown source={job.how_to_apply} linkTarget="_blank"/>
            </div>
          </div>
        </div>
      </Card.Body>
      <Card.Text className="action-btn-group">
        <Button variant="outline-primary" href={job.url} target="_blank" className="mr-2">View on GitHub</Button>
        <Button variant="outline-primary" onClick={handleShow}>View Details</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Job Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ wordBreak: 'break-all'}}>
              <ReactMarkdown source={job.description} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Text>
      <Card.Footer>
        <small className="text-muted">Created on <span className="font-weight-bold">{ new Date(job.created_at).toLocaleDateString() }</span></small>
      </Card.Footer>
    </Card>
  )
}
