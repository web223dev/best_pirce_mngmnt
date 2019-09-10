import React, {
  Component, Fragment
} from 'react';
import moment from 'moment';

class PriceTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      checked: false,
      price: props.price,
      key: props.index,
      updatedPrice: false
    };
  }

  componentWillReceiveProps(props) {
    const { checked, price, index } = props;
    if(this.props.checked !== checked) {
      if (checked) {
        this.setState({
          checked: true
        });
        this.handleCheckPrice(price);
      } else {
        this.setState({
          checked: false
        });
        this.handleCheckPrice(index);
      }
    }
  }

  getTotalPrice(prices) {
    let total = 0;
    let totals = 0;
    for (let i = 0; i < prices.length; i++) {
      if (!prices[i]) {
        continue;
      }
      total += Number(prices[i]);
    }
    this.setState({
      updatedPrice: true
    });
    totals = Math.round(total * 10000) / 10000;
    return totals;
  }

  handleEditPrice() {
    this.setState({
      editable: true
    });
  }

  handleCheckTaxes() {
    const { price } = this.state;
    price.isTaxSelected = !price.isTaxSelected;
    if (!price.isTaxSelected) {
      price.totalPrice = this.getTotalPrice([price.priceBasis, price.markup, price.freight]);
    } else {
      price.totalPrice = this.getTotalPrice([price.priceBasis, price.markup, price.freight, price.taxes]);
    }
    this.setState({
      price
    });
  }

  handleChangeValue(field, event) {
    event.preventDefault();
    const { price } = this.state;
    const value = event.target.value.substring(1);
    if (field === 'markup') {
      price.markup = value;
      if (!price.isTaxSelected) {
        price.totalPrice = this.getTotalPrice([price.priceBasis, value, price.freight]);
      } else {
        price.totalPrice = this.getTotalPrice([price.priceBasis, value, price.freight, price.taxes]);
      }
    }
    if (field === 'freight') {
      price.freight = value;
      if (!price.isTaxSelected) {
        price.totalPrice = this.getTotalPrice([price.priceBasis, price.markup, value]);
      } else {
        price.totalPrice = this.getTotalPrice([price.priceBasis, price.markup, value, price.taxes]);
      }
    }
    this.setState({
      price
    });
  }

  handleEditClose() {
    const {
      updatedPrice, price
    } = this.state;
    const { onEditPrice } = this.props;
    this.setState({
      editable: false
    });
    if (updatedPrice) {
      onEditPrice(price);
    }
  }

  handleCheckPrice(price) {
    const { checked, key } = this.state;
    const { onCheckedPrice } = this.props;
    this.setState({
      checked: !checked
    });
    if (!checked) {
      onCheckedPrice(price);
    } else {
      onCheckedPrice(key);
    }
  }

  render() {
    const {
      editable, updatedPrice, price, key, checked
    } = this.state;
    const { priceSaved } = this.props;
    return (
      <tr className={!editable && updatedPrice && !priceSaved ? ('font-weight-bold') : ''}>
        <td onClick={this.handleCheckPrice.bind(this, price)} className={checked ? 'preview-checked' : ''}>
          {
            checked && (
              <i className="fa fa-check text-success"></i>
            )
          }
        </td>
        <td className="text-center" onClick={this.handleEditPrice.bind(this)}>
          {price.prodCode}
        </td>
        <td>
          {`$${price.priceBasis}`}
        </td>
        <td onClick={this.handleEditPrice.bind(this)}>
          {
            price.isMarkupUpdatable && editable ? (
              <input
                type="text"
                className="custom-control-label input-text text-center"
                value={`$${price.markup}`}
                onChange={this.handleChangeValue.bind(this, 'markup')}
              />
            ) : (
              price.markup ? `$${price.markup}` : '$0.00'
            )
          }
        </td>
        <td onClick={this.handleEditPrice.bind(this)}>
          {
            price.isFreightUpdatable && editable ? (
              <input
                type="text"
                className="custom-control-label input-text text-center"
                value={`$${price.freight}`}
                onChange={this.handleChangeValue.bind(this, 'freight')}
              />
            ) : (
              price.freight ? `$${price.freight}` : '$0.0000'
            )
          }
        </td>
        <td onClick={this.handleEditPrice.bind(this)}>
          {
            editable ? (
              <Fragment>
                <input defaultChecked={price.isTaxSelected} type="checkbox" id={`price_${price.suplierId}_${key}_tax`} onChange={this.handleCheckTaxes.bind(this)} />
                <label htmlFor={`price_${price.suplierId}_${key}_tax`}>{ `$${price.taxes}` }</label>
              </Fragment>
            ) : (
              price.isTaxSelected ? (`$${price.taxes}`) : ('$0.0000')
            )
          }
        </td>
        <td onClick={this.handleEditPrice.bind(this)} className="font-weight-bold text-danger">
          {`$${price.totalPrice}`}
        </td>
        <td onClick={this.handleEditPrice.bind(this)}>
          {
            moment(price.effectiveDatetime).format('MMMM Do, YYYY HH:mm a')
          }
        </td>
        <td>
          {
            editable && (
              <i className="fa fa-save text-success" onClick={this.handleEditClose.bind(this)}></i>
            )
          }
        </td>
      </tr>
    );
  }
}

PriceTableRow.defaultProps = {
  price: {},
  index: 0,
  checked: false,
  priceSaved: false,
  onEditPrice: () => {},
  onCheckedPrice: () => {}
};

export default PriceTableRow;
