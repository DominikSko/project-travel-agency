import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({ currentValue, limits, setOptionValue }) => (
  <div className={styles.number}>
    <input type='number'
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionNumber.propTypes = {
  values: PropTypes.array,
  currentValue: PropTypes.number,
  setOptionValue: PropTypes.func,
  limits: PropTypes.object,
};

export default OrderOptionNumber;
