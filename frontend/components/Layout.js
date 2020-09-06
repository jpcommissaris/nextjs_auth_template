import Header from '../components/Header'

const Layout = (props) => {
    const children = props.children

    return(
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    ) 
}
export default Layout