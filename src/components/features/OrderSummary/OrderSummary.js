import React from 'react';
import styles from './OrderSummary.scss';
import PropTypes from 'prop-types';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';

const OrderSummary = (props) => (
  <div>
    <h2 className={styles.component}>
      Total: <strong>$ {calculateTotal(formatPrice(props.totalCost), props.orderOptions)}</strong>
    </h2>
  </div>
);

OrderSummary.propTypes = {
  totalCost: PropTypes.string,
  orderOptions: PropTypes.object,
};

export default OrderSummary;
