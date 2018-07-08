import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
    overflowY: 'scroll'
  },
});

class TableView extends React.Component {
  render() {
    const { classes, page } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
               {this.props.tableHeader.map(data => {
                  return(<TableCell key={'header'+data.key}>{data.label}</TableCell>)
                })}
              </TableRow>
            </TableHead>
            <TableBody>
               {this.props.tableBody.map(data => {
                return(
                  <TableRow key={'body'+data.key}>
                    {data.content.map((value, index) =>{
                      return (
                        <TableCell key={'cell'+index}>
                        {value}
                      </TableCell>)
                    })}                  
                  </TableRow>)
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  Page number: {page}
                </TableCell>
                <TableCell>
                  <IconButton onClick={this.props.handleClick.bind(this, page-1)}>
                    <KeyboardArrowLeft />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={this.props.handleClick.bind(this, page+1)}>
                    <KeyboardArrowRight />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

TableView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableView);
