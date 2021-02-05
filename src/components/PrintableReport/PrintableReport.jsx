import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container, Col, Row, Table, Button, Modal, InputGroup, FormControl, Dropdown} from 'react-bootstrap';
import ScoreReport from './ScoreReport/ScoreReport.jsx';
import NotesReport from './NotesReport/NotesReport.jsx';
import styled from 'styled-components';

const SubHeader = styled.p `
    font-size: 1.4rem;
    text-decoration: underline;
`




export default function PrintableReport() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const notes = useSelector(state => state.notes);
    const {budget} = useSelector(state => state.budget);
    const {org_name, background, focus, phone, status, username, contact_name} = useSelector(state => state.detailsData);
    const qANDa = useSelector(state => state.qANDa);
    useEffect(() => {dispatch({type: 'FETCH_DETAILS_DATA', payload: id})}, [dispatch]);


    return (
        <Container style={{backgroundColor:'white'}}>
            <Container style={{textAlign:'center'}}>
                {org_name && <h1>{org_name}</h1>}
                <SubHeader>Contact Info:</SubHeader>
                {contact_name && <p>{contact_name}</p>}
                {username && <p>{username}</p>}
                {phone && <p>{phone}</p>}
            </Container>
            <Container style={{textAlign:'center'}}>
                <SubHeader>Organization Background:</SubHeader>
                {background && <p>{background}</p>}
                <Row>
                    <Col>
                        <SubHeader>Area of Focus:</SubHeader>
                        {focus && <p>{focus}</p>}
                    </Col>
                    <Col>
                        <SubHeader>Budget</SubHeader>
                        {budget && <p>{budget}</p>}
                    </Col>
                </Row>
            </Container>
            {qANDa.length > 0 && qANDa.map((qa) => <ScoreReport qa={qa}/>)}
            <h3 style={{textAlign:'center'}}>Notes</h3>
            {notes.length > 0 && notes.map((n)=> <NotesReport n={n}/>)}
            <Button onClick={()=>{history.push('/admin')}}>Back to Admin Main Page</Button>
        </Container>
        
        )
}