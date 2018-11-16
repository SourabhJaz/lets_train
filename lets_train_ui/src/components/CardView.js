import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
};

class CardView extends React.Component{
  render(){
    const { classes } = this.props;
    return (
      <div>
        {this.props.cardData.map(data => {
          return (
            <Card className={classes.card} key={data.key}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {data.type}
              </Typography>
              <Typography variant="headline" component="h2">
                {data.heading}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {data.subheading}
              </Typography>
              <Typography component="p">
                {data.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={
                  this.props.handleClick.bind(this, data.key)}>
                {data.buttonText}
              </Button>
            </CardActions>
          </Card>
          )}
        )}
      </div>
   )
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);
