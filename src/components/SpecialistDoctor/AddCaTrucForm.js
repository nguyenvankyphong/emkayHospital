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

class AddCaTrucForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectCa: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    console.log(this.state.selectCa);
    this.setState({ selectCa: e.target.value });
  }

  render() {
    const { classes } = this.props;
    let list = this.state.listCaTruc

    return (
      <div>
        <FormControl className={classes.formControl}>
            Chọn ca trựcs
            <Select
              value={this.state.selectCa}
              onChange={this.handleChange}
              name="age"
              className={classes.selectEmpty}
            >

              <MenuItem value="" disabled>
                Chọn ca trực
              </MenuItem>
              <MenuItem value={1}>8h - 16h</MenuItem>
              <MenuItem value={2}>16h - 24h</MenuItem>
              <MenuItem value={3}>24h - 8h</MenuItem>
            </Select>
          </FormControl>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default AddCaTrucForm;
