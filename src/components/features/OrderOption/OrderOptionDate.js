import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


class OrderOptionDate extends React.Component {
    state = {
      startDate: new Date(),
    };

    handleChange = date => {
      this.setState({
        startDate: date,
      });
    };
    render() {
      return (
        <DatePicker
          className={styles.date}
          selected={this.state.startDate}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
        />
      );
    }
}

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
