import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from '../../actions/tag';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
const Tag = () => {
    const [name, setName] = useState('')
    const [reqType, setReqType] = useState('')
    const [tagList, setTagList] = useState([])
    const [error, setError] = useState('')
 
    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    }, [])
 
 
    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setTagList(data.sort((a, b) => (a.slug > b.slug) ? 1 : -1))
            }
        });
    };

    const showMessage = () => {
        if (error) {
            return <p className="text-danger">Error: key already exists</p> 
        }else if(reqType=='create'){
            return <p className="text-success">Tag is created</p>
        }else if(reqType=='remove'){
            return <p className="text-danger">Tag is removed</p>
        }
    }
 
    const tagForm = () => (
        <Form onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"  onChange={(e) => handleInputChange(e)} value={name} required/>
            </Form.Group>
            <Row>
                <Col xs='12'>
                    <Button variant="primary" type="submit" onClick={(e) => setReqType('create')}>
                        Create
                    </Button>
                    <Button variant="danger" type="submit" onClick={(e) => setReqType('remove')}>
                        Remove
                    </Button>
                </Col>
            </Row>
        </Form>
    );
    const handleInputChange = (event) => {
        setName(event.target.value)
        setError('')
        setReqType('')
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(reqType== 'create') addTag()
        else if(reqType=='remove') deleteTag();
    };

    const addTag = () => {
        createTag({name}, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                loadTags()
            }
        });
    }

    const deleteTag = () => {
        removeTag(name, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadTags()
            }
        });
    };

    const showTags = () => {
        return tagList.map((t, i) => {
            return (
                <li key={i}>{t.name}</li>
            );
        });
    };
 
    return (
        <React.Fragment>
            {showMessage()}
            {tagForm()}
            {showTags()}
        </React.Fragment>
    );
};
 
export default Tag;