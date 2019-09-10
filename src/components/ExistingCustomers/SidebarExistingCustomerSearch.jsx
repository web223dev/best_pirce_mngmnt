import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';


class SidebarExistingCustomerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCustomerChange(selectedCustomer) {
    const { onCustomerChange } = this.props;
    onCustomerChange(selectedCustomer[0]);
  }

  render() {
    const { customers } = this.props;
    const searchCustomerList = customers && customers.length > 0 ? (
      <div className="search-box position-fixed" style={{ width: 300 }}>
        <h3 className="text-center bg-light">Customers</h3>
        <Typeahead
          id="search_customer"
          onChange={this.handleCustomerChange.bind(this)}
          labelKey={option => `${option.orgId} ${option.orgName}`}
          options={customers}
          placeholder="Enter ID"
        />
      </div>
    ) : (
      <h1>Loading...</h1>
    );

    return (
      <div>{searchCustomerList}</div>
    );
  }
}

SidebarExistingCustomerSearch.defaultProps = {
  customers: [],
  onCustomerChange: () => {}
};

export default SidebarExistingCustomerSearch;
