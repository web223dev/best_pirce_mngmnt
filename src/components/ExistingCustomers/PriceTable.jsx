import React, {
  Component
} from 'react';
import PriceTableTerminal from './PriceTableTerminal';

// const prices = require('./prices.json');

class PriceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceTerminals: []
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { priceDetails } = props;
    this.setState({
      priceTerminals: this.getPriceTerminals(priceDetails)
    });
  }

  getPriceTerminals(priceDetails) {
    const groups = [];
    const suppliers = [];
    if (priceDetails && priceDetails.length > 0) {
      for (let i = 0, ni = priceDetails.length; i < ni; i++) {
        const terminal = priceDetails[i];
        let group = groups.find(group => group.terminalId === terminal.terminalId);
        if (!group) {
          group = {
            ...terminal,
            suppliers: []
          };
          groups.push(group);
        }
        suppliers.push(terminal);
        group.suppliers = this.getPriceSuppliers(suppliers);
      }
    }
    return groups;
  }

  getPriceSuppliers(priceTerminals) {
    const groups = [];
    for (let j = 0, nj = priceTerminals.length; j < nj; j++) {
      const supplier = priceTerminals[j];
      let group = groups.find(group => group.suplierId === supplier.suplierId);
      if (!group) {
        group = {
          ...supplier,
          prices: []
        };
        groups.push(group);
      }
      group.prices.push(supplier);
    }
    return groups;
  }

  render() {
    const { priceTerminals } = this.state;

    const { onUpdatePrice, onCheckedPrice, priceSaved } = this.props;
    return (
      <div>
        {
          priceTerminals && priceTerminals.length > 0 && (
            priceTerminals.length !== 1 ? (
              priceTerminals.map((terminal, index) => (
                <PriceTableTerminal
                  key={index}
                  priceSaved={priceSaved}
                  terminal={terminal}
                  onUpdatePrice={onUpdatePrice}
                  onCheckedPrice={onCheckedPrice}
                />
              ))
            ) : (
              <PriceTableTerminal
                oneRow
                priceSaved={priceSaved}
                terminal={priceTerminals[0]}
                onUpdatePrice={onUpdatePrice}
                onCheckedPrice={onCheckedPrice}
              />
            )
          )
        }
      </div>
    );
  }
}

PriceTable.defaultProps = {
  priceDetails: [],
  priceSaved: false,
  onUpdatePrice: () => {},
  onCheckedPrice: () => {}
};

export default PriceTable;
