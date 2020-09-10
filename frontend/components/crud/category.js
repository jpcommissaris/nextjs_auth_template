import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { createCategory, getCategories, removeCategory } from '../../actions/category';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
const Category = () => {
    const [name, setName] = useState('')
    const [reqType, setReqType] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [error, setError] = useState('')
 
    const token = getCookie('token');

    useEffect(() => {
        loadCategories()
    }, [])
 
 
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategoryList(data);
            }
        });
    };

    const showMessage = () => {
        if (error) {
            return <p className="text-danger">Error: key already exists</p>;  
        }else if(reqType=='create'){
            return <p className="text-success">Category is created</p>;
        }else if(reqType=='remove'){
            return <p className="text-danger">Category is removed</p>;
        }
    }
 
    const categoryForm = () => (
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
        if(reqType== 'create') addCategory()
        else if(reqType=='remove') deleteCategory();
    };

    const addCategory = () => {
        createCategory({name}, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                loadCategories()
            }
        });
    }

    const deleteCategory = () => {
        removeCategory(name, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories()
            }
        });
    };

    const showCategories = () => {
        return categoryList.map((c, i) => {
            return (
                <li key={i}>{c.name}</li>
            );
        });
    };
 
    return (
        <React.Fragment>
            {showMessage()}
            {categoryForm()}
            {showCategories()}
        </React.Fragment>
    );
};
 
export default Category;