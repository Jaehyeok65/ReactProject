import React,{ Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from  '@material-ui/icons/Menu';
import  IconButton  from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'




const styles = {
  root : {
      flexGrow : 1,
  },
  MenuButton : {
      right : '20px',
      top : '15px',
      position : 'fixed',
  },
  LoginButton : {
      right : '120px',
      top : '10px',
      position : 'fixed'
  },
  navlink1 : {
     color : 'black',
     left : '80px',
     top : '15px',
     position : 'fixed',
  },
  navlink2 : {
    color : 'black',
    left : '160px',
    top : '15px',
    position : 'fixed',
 },
 navlink3 : {
  color : 'black',
  left : '240px',
  top : '15px',
  position : 'fixed',
},
}

class Navigation extends Component {



    render() {

      const { classes } = this.props;
  

        return (
          <div>
          <div className = {classes.root}>
            <Navbar bg="light">
            <IconButton color = "inherit"
               onClick = {this.handerDrawer}>
                   <MenuIcon />
               </IconButton>
            <Container>
    <Nav className="me-auto">
      <Link className = {classes.navlink1} component = {RouterLink} to = "/">Home</Link>
      <Link className = {classes.navlink2} component = {RouterLink} to = "/novel">무협</Link>
      <Link className = {classes.navlink3} component = {RouterLink} to = "/webtoon">웹툰</Link>
    </Nav>
    </Container>
  </Navbar>
       </div>
       <div style = {{margin : 'auto', marginTop : '20px'}}>
               { this.props.children }
           </div>
          </div>
        );
    }
}

export default withStyles(styles)(Navigation);