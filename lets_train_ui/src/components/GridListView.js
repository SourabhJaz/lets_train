import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: '200%',
  },
  gridList: {
    width: '90%',
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  chip: {
    display: 'flex',
    margin: theme.spacing.unit,
    // fontSize: '60%',
  },
});

class GridListView extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={4}>
       {this.props.chipData.map(data => {
        return(
            <GridListTile key={data.key}>
            <img src={'/'} />
            <GridListTileBar
                          title={data.label}
                          subtitle={''}
                          actionIcon={
                            <IconButton className={classes.icon}>
                              <InfoIcon />
                            </IconButton>
                          }
                        />
             </GridListTile>)
        })}
       </GridList>
      </div>
      );
  }
}

ButtonView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridListView);
