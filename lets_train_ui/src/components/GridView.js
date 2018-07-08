import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

const styles = theme => ({
  root: {
    display:'auto'
  },
  card: {
    marginTop:'10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class GridView extends React.Component{
  render() {
    const { classes } = this.props;
    const tileData = this.props.tileData;
    return (
      <div className={classes.root}>
      {tileData.map(tile => (
      <Card className={classes.card}>
          <ReactPlayer url={tile.path} 
            controls={true}
            volume={true}
           />            
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {tile.title}
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
      </Card>
      ))}
      </div>
    );
 }
}

GridView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridView);
