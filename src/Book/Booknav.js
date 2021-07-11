import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import  MenuItem  from '@material-ui/core/MenuItem';
import  IconButton  from '@material-ui/core/IconButton';
import MenuIcon from  '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'


const styles = {
    root : {
        flexGrow : 1,
    },
    MenuButton : {
        marginRight : 'auto'
    }
}

class Booknav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle : false
        };
    }
    handerDrawer = () => this.setState({ toggle : !this.state.toggle})

    render() {
        const { classes } = this.props;

        return(
            <div>
           <div className = { classes.root } >
               <AppBar position = "static">
               <IconButton className =  { classes.MenuButton } color = "inherit"
               onClick = {this.handerDrawer}>
                   <MenuIcon />
               </IconButton>
               </AppBar>
               <Drawer open = {this.state.toggle}>
                   <MenuItem onClick = {this.handerDrawer}>
                       <Link component = {RouterLink} to ="/">Home</Link>
                       </MenuItem>
                   <MenuItem onClick = {this.handerDrawer}>
                   <Link component = {RouterLink} to ="/ranking">순위</Link>
                   </MenuItem>
                   <MenuItem onClick = {this.handerDrawer}>
                   <Link component = {RouterLink} to ="/random">랜덤</Link>
                   </MenuItem>
               </Drawer>
           </div>
           <div id ="content" style = {{margin : 'auto', marginTop : '20px'}}>
               { React.cloneElement(this.props.children)}
           </div>
           </div>
        )
    }
}

export default withStyles(styles)(Booknav);