import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionDate = ({ currentValue, setOptionValue }) => (
  <div>
    <DatePicker
      className={styles.input}
      type="date"
      value={currentValue}
      selected={currentValue}
      onChange={setOptionValue}
      placeholderText={'Click to select a date'}
    />
  </div>
);

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.any,
};

export default OrderOptionDate;
