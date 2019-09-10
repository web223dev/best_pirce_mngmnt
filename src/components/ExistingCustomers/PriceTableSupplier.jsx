import React, {
  Component, Fragment
} from 'react';
import PriceTableRow from './PriceTableRow';

class PriceTableSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierChecked: false
    };
  }

  handleSupplierChecked() {
    const { supplierChecked } = this.state;
    this.setState({
      supplierChecked: !supplierChecked
    });
  }

  render() {
    const { supplierChecked } = this.state;
    const { terminal, supplier, terminalChecked, priceSaved } = this.props;
    return (
      <Fragment>
        <tr className="text-dark">
          <th className="custom-control custom-checkbox" scope="row">
            <input checked={terminalChecked || supplierChecked} type="checkbox" className="custom-control-input" id={`supplier_${terminal.terminalId}_${supplier.suplierId}`} onChange={this.handleSupplierChecked.bind(this)} />
            <label className="custom-control-label font-weight-bold" htmlFor={`supplier_${terminal.terminalId}_${supplier.suplierId}`}>{supplier.supplierCode}</label>
          </th>
        </tr>
        {
          supplier.prices && supplier.prices.length > 0 && (
            supplier.prices.map((price, key) => (
              <PriceTableRow
                key={key}
                index={key}
                price={price}
                priceSaved={priceSaved}
                checked={terminalChecked || supplierChecked}
                onEditPrice={this.props.onUpdatePrice}
                onCheckedPrice={this.props.onCheckedPrice}
              />
            ))
          )
        }
      </Fragment>
    );
  }
}

PriceTableSupplier.defaultProps = {
  terminal: {},
  supplier: {},
  priceSaved: false,
  terminalChecked: false,
  onUpdatePrice: () => {},
  onCheckedPrice: () => {}
};

export default PriceTableSupplier;
