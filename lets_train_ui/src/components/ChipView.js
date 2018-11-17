import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Lock from '@material-ui/icons/Lock';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit
  },
  chip: {
    margin: theme.spacing.unit,
    fontSize: theme.spacing.unit*2,
  },
});

class ChipView extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
       {this.props.chipData.map(data => {
        return(<Chip icon={<Lock />} variant='outlined' key={data.key} label={data.label} className={classes.chip} 
          onClick={this.props.handleClick.bind(this, data.key)} />)
        })}
      </div>
      );
  }
}

ChipView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipView);
