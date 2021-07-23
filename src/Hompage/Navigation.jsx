import React,{ Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from  '@material-ui/icons/Menu';
import  IconButton  from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import MenuItem  from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';




const styles = {
  root : {
      flexGrow : 1,
  },
  MenuButton : {
      left : '20px',
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
     position : 'absolute',
  },
  navlink2 : {
    color : 'black',
    left : '160px',
    top : '15px',
    position : 'absolute',
 },
 navlink3 : {
  color : 'black',
  left : '240px',
  top : '15px',
  position : 'absolute',
},
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle : false,
    };
  }

  handerDrawer = () => this.setState({ toggle : !this.state.toggle})



    render() {

      const { classes } = this.props;
  

        return (
          <div>
          <div className = {classes.root}>
            <Navbar bg="light">
            <IconButton color = "inherit" className = {classes.MenuButton}
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
              <Drawer open = {this.state.toggle}>
                       <MenuItem onClick = {this.handerDrawer}>
                       <HomeIcon /><Link component = {RouterLink} to ="/"> Home</Link>
                       </MenuItem>
                       <MenuItem onClick = {this.handerDrawer}>
                       <MenuBookIcon /><Link component = {RouterLink} to ="/novel"> 소설</Link>
                       </MenuItem>
                       <MenuItem onClick = {this.handerDrawer}>
                       <CollectionsBookmarkIcon /><Link component = {RouterLink} to ="/webtoon"> 웹툰</Link>
                       </MenuItem>
               </Drawer>
       </div>
       <div style = {{margin : 'auto', marginTop : '20px'}}>
               { this.props.children }
           </div>
          </div>
        );
    }
}

export default withStyles(styles)(Navigation);