import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tile:{
    height: theme.spacing.unit * 20,
    padding: theme.spacing.unit * 2,
    background: theme.palette.primary.dark, 
  },
  button:{
    width: '100%',
    height: '100%',
  },
  typography:{
    color: 'rgba(255, 255, 255, 0.54)',  
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: theme.spacing.unit * 5,
  },
});

class ButtonListView extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
       {this.props.chipData.map(data => {
        return(
            <Grid item xs={12} md={4} lg={3} key={data.key}
              onClick={this.props.handleClick.bind(this, data.key)}>
              <Paper className={classes.tile}>
                <Button className={classes.button}>
                  <Typography variant="headline" align="center" className={classes.typography}>
                      {data.label}
                  </Typography>
                  <Tooltip title={"EXPLORE "+data.label}>
                      <PlayCircleOutline className={classes.icon} />
                  </Tooltip>
                </Button>
              </Paper>
             </Grid>)
        })}
       </Grid>
      </div>
      );
  }
}

ButtonListView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonListView);
