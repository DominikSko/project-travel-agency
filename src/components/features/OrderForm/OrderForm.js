import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

class OrderForm extends React.Component {

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
    pricing: PropTypes.array,
    setOrderOption: PropTypes.func,
  }

  render() {
    const { tripCost, options, setOrderOption } = this.props;
    return (
      <Grid>
        <Row>
          {pricing.map(option =>
            <Col md={4} key={option.id}>
              <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
            </Col>
          )}
          <Col xs={12}>
            <OrderSummary tripCost={tripCost} options={options} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderForm;
