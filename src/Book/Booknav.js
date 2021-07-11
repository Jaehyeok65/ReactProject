import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import  MenuItem  from '@material-ui/core/MenuItem';
import  IconButton  from '@material-ui/core/IconButton';
import MenuIcon from  '@material-ui/icons/Menu';


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
           <div className = { classes.root } >
               <AppBar position = "static">
               <IconButton className =  { classes.MenuButton } color = "inherit"
               onClick = {this.handerDrawer}>
                   <MenuIcon />
               </IconButton>
               </AppBar>
               <Drawer open = {this.state.toggle}>
                   <MenuItem onClick = {this.handerDrawer}>Home</MenuItem>
                   <MenuItem onClick = {this.handerDrawer}>순위</MenuItem>
                   <MenuItem onClick = {this.handerDrawer}>랜덤</MenuItem>
                   <MenuItem onClick = {this.handerDrawer}>추천작품</MenuItem>
               </Drawer>
           </div>
        )
    }
}

export default withStyles(styles)(Booknav);