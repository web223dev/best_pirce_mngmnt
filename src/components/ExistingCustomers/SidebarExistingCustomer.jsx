import React, { Component } from 'react';
import SidebarExistingCustomerSearch from './SidebarExistingCustomerSearch';

class SidebarExistingCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null
    };
  }


  render() {
    const { customers, currentCustomerSites, onCustomerChange, onSubCustomerChange, onCustomerSearch, selectItem, selectSubItem } = this.props;
    const userList = customers.length ? (
      currentCustomerSites.length !== 1 ? (
        currentCustomerSites.map((customer, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  {
                    customer.sites.length !== 1 ? (
                      <details open={index === selectItem || currentCustomerSites.length === 1} >
                        <summary onClick={() => onCustomerChange(customer)}>{customer.orgName}</summary>
                        {
                          customer.sites.map((site, key) => (
                            <p className={selectSubItem === key ? 'font-weight-bold' : ''} onClick={() => onSubCustomerChange(site.orgId, customer.orgId)} key={key}>{site.orgCode}-{site.orgSubcode}</p>
                          ))
                        }
                      </details>
                    ) : (
                        <div onClick={() => onCustomerChange(customer)}>
                          <summary className={selectItem === index ? 'font-weight-bold' : ''}>{customer.orgName}</summary>
                        </div>
                      )
                  }
                </li>
              </ul>
            </div>)
        })
      ) : (
          <div>
            <ul>
              <li>
                {
                  currentCustomerSites[0].sites.length !== 1 ? (
                    <details  >
                        <summary>{currentCustomerSites[0].orgName}</summary>
                        {
                          currentCustomerSites[0].sites.map((site, key) => (
                            <p className={selectSubItem === key ? 'font-weight-bold' : ''} onClick={() => onSubCustomerChange(site.orgId, currentCustomerSites[0].orgId)} key={key}>{site.orgCode}-{site.orgSubcode}</p>
                          ))
                        }
                      </details>
                  ):(
                    <div onClick={() => onCustomerChange(currentCustomerSites[0])}>
                      <summary>{currentCustomerSites[0].orgName}</summary>
                    </div>
                  )
                }
              </li>
            </ul>
          </div>
        )
    ) : (
        <p>Looding...</p>
      );
    return (
      <aside className="row" style={{ position: 'fixed', width: 317 }}>
        <SidebarExistingCustomerSearch className="SidebarExistingCustomerSearch" customers={customers} onCustomerChange={onCustomerSearch} />
        <div className="userList">{userList}</div>
      </aside>
    );
  }
}

SidebarExistingCustomer.defaultProps = {
  selectItem: 1,
  customers: [],
  customerSites: [],
  onCustomerChange: () => { },
  onCustomerSearch: () => { }
};

export default SidebarExistingCustomer;
