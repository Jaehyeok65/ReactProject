import React,{ Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from  '@material-ui/icons/Menu';
import  IconButton  from '@material-ui/core/IconButton';



const styles = {
  root : {
      flexGrow : 1,
  },
  MenuButton : {
      right : '20px',
      top : '10px',
      position : 'static',
  },
  LoginButton : {
      right : '120px',
      top : '10px',
      position : 'fixed'
  },
}

class Navigation extends Component {



    render() {
      const {classes} = this.props;

        return (
          <div>
            <Navbar bg="light">
            <IconButton color = "inherit"
               onClick = {this.handerDrawer}>
                   <MenuIcon />
               </IconButton>
            <Container>
    <Navbar.Brand href="/home">무협툰</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/novel">무협</Nav.Link>
      <Nav.Link href="/webtoon">웹툰</Nav.Link>
    </Nav>
    </Container>
  </Navbar>

          </div>
        );
    }
}

export default withStyles(styles)(Navigation);