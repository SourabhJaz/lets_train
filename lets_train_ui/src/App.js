import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Department from './containers/Department';
import Category from './containers/Category';
import Training from './containers/Training';
import Content from './containers/Content';
import User from './containers/User';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
  },
});

class App extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Department" />
            <Tab label="Category" />
            <Tab label="Training" />
            <Tab label="User" />
            <Tab label="Content" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Department /></TabContainer>}
        {value === 1 && <TabContainer><Category /></TabContainer>}
        {value === 2 && <TabContainer><Training /></TabContainer>}
        {value === 3 && <TabContainer><User /></TabContainer>}
        {value === 4 && <TabContainer><Content /></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
