import React, {
  Component, Fragment
} from 'react';
import { Collapse } from 'reactstrap';
import PriceTableSupplier from './PriceTableSupplier';

class PriceTableTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terminalChecked: false,
      tableOpen: false
    };
  }

  handleTerminalChecked() {
    const { terminalChecked } = this.state;
    this.setState({
      terminalChecked: !terminalChecked
    });
  }

  render() {
    const { terminalChecked, tableOpen } = this.state;
    const { terminal, oneRow, priceSaved } = this.props;
    return (
      <Fragment>
        <div className="custom-control custom-checkbox d-flex justify-content-between">
          <div>
            <label className="custom-control-label lead font-weight-bolder text-success" htmlFor={`terminal_${terminal.terminalId}`}>
              {terminal.terminalName}
            </label>
          </div>
          {
            !oneRow && (
              <div className="btn btn-light outline-none" onClick={() => this.setState({ tableOpen: !tableOpen })}>
                {
                  !tableOpen ? (
                    <i className="fa fa-chevron-down text-success"></i>
                  ) : (
                    <i className="fa fa-chevron-up text-success"></i>
                  )
                }
              </div>
            )
          }
        </div>
        <Collapse isOpen={!oneRow ? tableOpen : oneRow}>
          <table className="table table-striped text-center">
            <thead>
              <tr className="bg-light text-dark tr-border-top">
                <th scope="col">Supplier</th>
                <th scope="col">Product Name</th>
                <th scope="col">Base Price</th>
                <th scope="col">Markup</th>
                <th scope="col">Freight</th>
                <th scope="col">Tax</th>
                <th scope="col">Total</th>
                <th scope="col">Effective Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                terminal.suppliers && terminal.suppliers.length > 0 && (
                  terminal.suppliers.map((supplier, index) => (
                    <PriceTableSupplier
                      key={index}
                      terminal={terminal}
                      supplier={supplier}
                      priceSaved={priceSaved}
                      terminalChecked={terminalChecked}
                      onUpdatePrice={this.props.onUpdatePrice}
                      onCheckedPrice={this.props.onCheckedPrice}
                    />
                  ))
                )
              }
            </tbody>
          </table>
        </Collapse>
      </Fragment>
    );
  }
}

PriceTableTerminal.defaultProps = {
  oneRow: false,
  terminal: {},
  priceSaved: false,
  onUpdatePrice: () => {},
  onCheckedPrice: () => {}
};

export default PriceTableTerminal;
