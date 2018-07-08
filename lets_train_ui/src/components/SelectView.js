import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SelectView extends React.Component {
  handleChange = event => {
    this.props.handleSelect(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">{this.props.title}</InputLabel>
          <Select
            onChange={this.handleChange}
            value={''}
          >
          {this.props.menuData.map(data => {
              return (<MenuItem key={data.key} value={data.key}>{data.label}</MenuItem>)
            }
          )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectView);
