import React, { useState } from 'react';
import { Container, Row, Col, CardDeck, Spinner, Image, Card } from 'react-bootstrap';

import useFetchJobs from './useFetchJobs';
import Job from './Jobs';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import Logo from './img/logo.png';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container>
      <Row className="justify-content-center mt-4 mb-2 title-bg mr-1 ml-1">
        <Image src={Logo} roundedCircle className="github-logo"></Image>
        <h1>GitHub Jobs</h1>
      </Row>
      <Row className="mr-1 ml-1">
        <SearchForm params={params} onParamChange={handleParamChange} />
      </Row>
      <Row className="mr-1 ml-1">
        { (!loading && jobs.length > 1) ? <JobsPagination page={page} jobs={jobs} setPage={setPage} hasNextPage={hasNextPage}/> : '' }
      </Row>
      <Row>
        {loading && <Spinner animation="border" role="status" className="loader">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        {error && <h1>Error. Try Refreshing</h1>}
        {(!loading && jobs.length > 1) ?
          <CardDeck>
            { jobs.map(job =>
              <Col key={job.id} lg={4} md={5} style={{ margin: '10px 0'}}><Job job={job} /></Col>
            ) }
          </CardDeck>
          :
          <div className="no-results-found mr-2 ml-2">{!loading && <Card body>Sorry! No results found.</Card>}</div>
        }
      </Row>
      <Row className="mr-1 ml-1">
        { (!loading && jobs.length > 1) ? <JobsPagination page={page} jobs={jobs} setPage={setPage} hasNextPage={hasNextPage}/> : '' }
      </Row>
    </Container>
  );
}

export default App;
