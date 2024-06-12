import React, { useState,Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody,MDBInput } from 'mdb-react-ui-kit';
 import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ErrorBoundary } from 'react-error-boundary';
import './location.css';

function LOCATION() {

    const [searchResults, setSearchResults] = useState([]);
    const [show, setShow] = useState(false);

    const [location, setLocation] = useState('');
    const [business, setBusiness] = useState('');
    const [timeIn, setTimeIn] = useState('');
    const [timeOut, setTimeOut] = useState('');

    const [data, setData] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function ErrorLog({ error }) {
        return (
            <div role="alert">
                <p>An error ocuured</p>
                <pre>{error.message}</pre>
            </div>
        )
    }

    const clearData = () => {
        setSearchResults('');
    }

    const locationApi = () => {
        axios.get("https://localhost:7295/api/location/GetAllLocations")
        .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // useState(() => {
    //     locationApi();
    // }, []);

    const searchDetails = () => {
        try {
            const url = 'https://localhost:7295/api/location/SearchLocation';
            const data = {
                "location": searchResults
            }
            axios.post(url, data)
                .then((result) => {
                    setData(result.data)
                    clearData();
                });
        }
        catch (error) {
            console.error(error.result.searchResults);
        }
    }
    
    return (
        <>
        <ErrorBoundary FallbackComponent={ErrorLog}>
        <Fragment>        
        <Container show={show} onHide={handleClose}>        
        <br/>
        <br/>
        <br/>
            <div className="col-xs-3">
                {/* <input type="text" className="form-control" value={searchResults}
                    onChange={(e) => {
                        setSearchResults(e.target.value);
                    }}
                />  */}
                <MDBInput wrapperClass='mb-3' id='formControlLg' placeholder="Bing Location Search" type='text' size="lg" value={searchResults} onChange={(e) => setSearchResults(e.target.value)} />
            </div>
            <button  class="btn btn-primary" onClick={searchDetails}>Search</button>            
            </Container>
            <br/>
            <br/>
            <br/>
            <MDBTable>
                <MDBTableHead dark>
                    <tr>
                        {/* <th scope='col'>ID</th> */}
                        <th scope='col'>Location</th>
                        <th scope='col'>Business</th>
                        <th scope='col'>TimeIn</th>
                        <th scope='col'>TimeOut</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{item.location}</td>
                                        <td>{item.business}</td>
                                        <td>{moment(item.timeIn).format('hh:mm A')}</td>
                                        <td>{moment(item.timeOut).add(12, 'hours').format('hh:mm A')}</td>
                                        {/* <td>{moment('2016-03-12 13:00:00').add(24, 'hours').format('LLL')}</td>  */}
                                    </tr>
                                )
                            })
                            :
                            ''
                    }
                </MDBTableBody>
            </MDBTable>
            </Fragment>
            </ErrorBoundary>
        </>
    );
}

export default LOCATION;