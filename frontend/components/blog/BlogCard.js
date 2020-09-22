import Link from 'next/link'
import {API} from '../../config'
import renderHTML from 'react-render-html'
import moment from 'moment' 

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const imagestyle = {
    maxHeight: '150px',
    width: 'auto'
}


const BlogCard = ({blog}) => {

    const showBlogCategories = (blog) => {
        return blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className='btn btn-category float-md-right mt-3' > {c.name} </a>
            </Link>
        ))
    }

    const showBlogTags = (blog) => {
        return blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className='btn btn-tag' > {t.name} </a>
            </Link>
        ))
    }



    return (
        <Container fluid className="lead pb-4">
            
            <Row>
                <Col md={12}>
                    <section>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className='h2 pt-3 pb-3 mb-0 font-weight-bold'>
                                {blog.title}
                            </a>
                        </Link>  
                    </section>                
                </Col>
                <Col md={12}>
                    <section>
                        <p className='mark ml-1 pt-2 pb-2'> 
                            Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <section>
                        <img 
                            className='img img-fluid' 
                            style={imagestyle} 
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title} 
                        > 
                        </img>
                    </section>
                </Col>
                <Col md={8}>
                    <section className='pb-3'>
                        {renderHTML(blog.excerpt)}
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className=''>read more</a>
                        </Link>
                    </section>
                </Col>
                <Col md={12}>
                    {showBlogTags(blog)}
                </Col>
                <Col md={12}>
                    <hr 
                        className="mt-1 mb-2" 
                        style={{backgroundColor: 'black', height: '0.1px'}}
                    />
                </Col>
            </Row>
        </Container>
    )
}
export default BlogCard