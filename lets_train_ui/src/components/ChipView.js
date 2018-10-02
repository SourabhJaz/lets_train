import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: '200%',
  },
  chip: {
    margin: theme.spacing.unit,
    // fontSize: '60%',
  },
});

class ChipView extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
       {this.props.chipData.map(data => {
        return(<Chip key={data.key} label={data.label} className={classes.chip} 
          onClick={this.props.handleClick.bind(this, data.key)}/>)
        })}
      </div>
      );
  }
}

ChipView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipView);
