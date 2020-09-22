import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import {useState} from 'react'
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'
import BlogCard from '../../components/blog/BlogCard'
import {API, DOMAIN, APP_NAME} from '../../config'


import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const index = ({blogs, categories, tags, size}) => {

    const router = useRouter()

    const head = () => (
        <Head>
            <title>Programming blogs | {APP_NAME} </title>
            <meta 
                name="description" 
                content="blogs on programming react node next python and web development"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}></link>
            <meta 
                property='og:title'
                content={`latest web development blogs | ${APP_NAME}`}
            />
            <meta 
                name="og:description" 
                content="blogs on programming react node next python and web development"
            />
            <meta name="og:type" content="website"/>
            <meta name="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta name="og:site_name" content={`${APP_NAME}`}/>

            <meta name="og:image" content={`${DOMAIN}/static/images/blogmeta.png`}/>
            <meta name="og:image:secure_url" content={`${DOMAIN}/static/images/blogmeta.png`}/>
            <meta name="og:image:type" content='image/png'/>

        </Head> 
    )

    const body = () => (
        <Layout>
            <main>
                <Container fluid>
                    <header>
                        <Col md={12}>
                            <h1 className="display-5 font-weight-bold text-center">
                                Blogs 
                            </h1>   
                        </Col>  
                        <section>
                            {showAllCategories()}    
                        </section>
                    </header>  
                </Container>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            {showAllBlogs()}
                        </Col>
                    </Row>
                </Container>
                
            </main>
        </Layout>
    )


    const showAllCategories = () => {
        return (
            <div className='text-center pb-5'>
                {categories.map((c, i) => (
                    <Link href={`/categories/${c.slug}`} key={i}>
                        <a className='btn category-btn'> {c.name} </a>
                    </Link>
                ))}
            </div> 
        )
    }


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
            <article key={i}>
                <BlogCard blog={blog} /> 
                <hr />
            </article>
        )})
    }

    return (
        <React.Fragment>
            {head()}
            {body()}
        </React.Fragment>
        
    )
}

//good for SEO because the first time it sees your page it will see all data from blog

index.getInitialProps = () => {
    return listBlogsWithCategoriesAndTags().then(data => {
        if(data.error){
            console.log(data.error)
        }else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size 
            }
        }
    })
}

export default index