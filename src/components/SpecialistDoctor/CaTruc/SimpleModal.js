import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "./AddCaTrucForm"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 30;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      listCaTruc: [],
    };

  }

  componentWillReceiveProps(newProps){
    this.setState({
      listCaTruc: newProps.list
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    console.log(this.state.selectCa);
    this.setState({ selectCa: e.target.value });
  }

  render() {
    const { classes } = this.props;
    let list = this.state.listCaTruc

    return (
      <div>
        <a onClick={this.handleOpen}>{this.props.name}</a>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Ca khám:
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {this.state.listCaTruc.map((item, index) => (
                <Grid item xs = {12} key = {index}>
                    Ca {item.Buoi}: {item.HoTen}
                </Grid>
              ))}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <Form room={this.props.room} date={this.props.date}/>
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
