import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: '200%',
  },
  chip: {
    display: 'flex',
    margin: theme.spacing.unit,
    // fontSize: '60%',
  },
});

class ButtonView extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
       {this.props.chipData.map(data => {
        return(<Button variant="contained" size="large" color="primary" key={data.key}
         className={classes.chip} onClick={this.props.handleClick.bind(this, data.key)}>
          {data.label}
          <PlayCircleOutline className={classes.chip} />
          </Button>)
        })}
      </div>
      );
  }
}

ButtonView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonView);
