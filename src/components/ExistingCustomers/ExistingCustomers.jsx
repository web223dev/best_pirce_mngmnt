/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import axios from 'axios';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import SidebarExistingCustomer from './SidebarExistingCustomer';
import UserInfo from './UserInfo';
import Modal from './Modal';
import './existingCustomers.css';
import PriceTable from './PriceTable';
import ConvertUpdatingPrices from './ConvertUpdatingPrices';


class ExistingCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            selectItem: 0,
            selectSubItem: 0,
            selectedCustomer: null,
            currentPage: 1,
            perPage: 10,
            upperPageBound: 3,
            lowerPageBound: 0,
            pageBound: 3,
            customers: [],
            customerSites: [],
            priceDetails: [],
            updatingPrices: [],
            checkedPrices: [],
            toggleOpen: false,
            priceSaved: false
        };
    }

    componentDidMount() {
        axios.get('http://40.70.129.139/api/v1/fuel/wholesale/bpm/ui/customer/list')
            .then(res => {
                if (res.data && res.data.customerDetailsList) {

                    const { customerDetailsList: customers } = res.data;
                    this.setState({
                        customers,
                        customerSites: this.getCustomerSites(customers)
                    });
                    this.componentWillReceiveProps();
                }
            });
    }

    componentWillReceiveProps() {
        const { customerSites } = this.state;
        this.handleCustomerSelect(customerSites[0]);
    }

    getCustomerSites(customers) {
        const groups = [];
        for (let i = 0, ni = customers.length; i < ni; i++) {
            const customer = customers[i];
            let group = groups.find(group => {
                return group.orgCode === customer.orgCode
            });
            if (!group) {
                group = {
                    ...customer,
                    sites: []
                };
                groups.push(group);
            }
            group.sites.push(customer);
        }
        return groups;
    }

    handleCustomerSearch(searchCustomer) {
        if (searchCustomer) {
            const customers = [];
            customers.push(searchCustomer);
            this.setState({
                customerSites: this.getCustomerSites(customers)
            });
            this.handleCustomerSelect(searchCustomer);
        } else {
            axios.get('http://40.70.129.139/api/v1/fuel/wholesale/bpm/ui/customer/list')
                .then(res => {
                    if (res.data && res.data.customerDetailsList) {

                        const { customerDetailsList: customers } = res.data;
                        this.setState({
                            customers,
                            customerSites: this.getCustomerSites(customers)
                        });
                        this.componentWillReceiveProps();
                    }
                });
        }

    }

    handleCustomerSelect(selectedCustomer) {
        const { customerSites } = this.state; console.log(selectedCustomer);
        if (selectedCustomer && selectedCustomer.orgId) {
            axios.get(`http://40.70.129.139/api/v1/fuel/wholesale/bpm/ui/price/pricedetails?customerId=${selectedCustomer.orgId}`)
                .then(res => {
                    if (res.data && res.data.customerDailyPriceDetailsList) {
                        const { customerDailyPriceDetailsList: priceDetails } = res.data;
                        const selectedMenuIndex = customerSites.findIndex(customer => customer.orgId === selectedCustomer.orgId);
                        const selectedData = customerSites.find(customer => customer.orgId === selectedCustomer.orgId);
                        if (selectedCustomer.sites !== undefined && selectedCustomer.sites.length > 1) {
                            this.setState({
                                selectItem: selectedMenuIndex
                            });
                        } else {
                            this.setState({
                                selectItem: selectedMenuIndex,
                                users: [selectedData],
                                priceDetails
                            });
                        }

                    }
                });
        }

    }

    handleSubCustomerSelect(subOrgId, parentOrgId) {
        const { customerSites } = this.state;
        const defaultSelectedMenu = customerSites.find(customer => customer.orgId === parentOrgId);
        if (subOrgId) {
            axios.get(`http://40.70.129.139/api/v1/fuel/wholesale/bpm/ui/price/pricedetails?customerId=${subOrgId}`)
                .then(res => {
                    if (res.data && res.data.customerDailyPriceDetailsList) {
                        const { customerDailyPriceDetailsList: priceDetails } = res.data;
                        if (defaultSelectedMenu) {
                            const subMenus = defaultSelectedMenu.sites;
                            const selectedMenuIndex = subMenus.findIndex(sMenu => sMenu.orgId === subOrgId);
                            subMenus.map(subMenu => {
                                if (subMenu.orgId === subOrgId) {
                                    this.setState({
                                        users: [subMenu],
                                        priceDetails,
                                        selectSubItem: selectedMenuIndex
                                    })
                                }
                            })
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handlePrevPage() {
        const { currentPage, pageBound, upperPageBound, lowerPageBound, perPage, customerSites } = this.state;
        if ((currentPage - 1) % pageBound === 0) {
            this.setState({ upperPageBound: upperPageBound - pageBound });
            this.setState({ lowerPageBound: lowerPageBound - pageBound });
        }
        let pageId = currentPage - 1;
        this.setState({ currentPage: pageId, selectItem: 0 });
        const indexOfLastCustomer = pageId * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        this.handleCustomerSelect(currentCustomerSites[0]);
    }

    handleNextPage() {
        const { currentPage, pageBound, upperPageBound, lowerPageBound, perPage, customerSites } = this.state;
        if ((currentPage + 1) > upperPageBound) {
            this.setState({ upperPageBound: upperPageBound + pageBound });
            this.setState({ lowerPageBound: lowerPageBound + pageBound });
        }
        let pageId = currentPage + 1;
        this.setState({ currentPage: pageId, selectItem: 0 });
        const indexOfLastCustomer = pageId * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        this.handleCustomerSelect(currentCustomerSites[0]);
    }

    handleFirstClick() {
        this.setState({ upperPageBound: 3 });
        this.setState({ lowerPageBound: 0 });
        let pageId = 1;
        this.setState({ currentPage: pageId, selectItem: 0 });
        const { perPage, customerSites } = this.state;
        const indexOfLastCustomer = pageId * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        this.handleCustomerSelect(currentCustomerSites[0]);
    }

    handleLastClick() {
        const { customerSites, perPage, pageBound } = this.state;
        const last = Math.ceil(customerSites.length / perPage);
        this.setState({ upperPageBound: last });
        this.setState({ lowerPageBound: last - pageBound });
        this.setState({
            currentPage: last,
            selectItem: 0
        });
        const indexOfLastCustomer = last * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        this.handleCustomerSelect(currentCustomerSites[0]);
    }

    handlePageClick(page) {
        const { perPage, customerSites } = this.state;
        const indexOfLastCustomer = page * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        this.handleCustomerSelect(currentCustomerSites[0]);
        this.setState({
            currentPage: page,
            selectItem: 0
        });
    }

    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let pageId = this.state.upperPageBound + 1;
        this.setState({ currentPage: pageId, selectItem: 0 });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let pageId = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: pageId, selectItem: 0 });
    }

    handlePrevItem(item) {
        const { selectItem } = this.state;
        this.setState({ selectItem: selectItem - 1 });
        this.handleCustomerSelect(item);
    }

    handleNextItem(item) {
        const { selectItem } = this.state;
        this.setState({ selectItem: selectItem + 1 });
        this.handleCustomerSelect(item);
    }

    previewModal() {
        const { toggleOpen, checkedPrices } = this.state;
        this.setState({
            toggleOpen: !toggleOpen,
            checkedPrices
        });
    }

    handleUpdatePrice(price) {
        const {
            updatingPrices
        } = this.state;
        if (updatingPrices.indexOf(price) === -1) {
            updatingPrices.push(price);
        }
        this.setState({
            priceSaved: false,
            updatingPrices
        });
    }

    async handleCheckedPrice(price) {
        const {
            checkedPrices
        } = this.state;
        if (price.orgId) {
            if (checkedPrices.indexOf(price) === -1) {
                checkedPrices.push(price);
            }
        } else {
            if (checkedPrices.indexOf(checkedPrices[price]) > -1) {
                checkedPrices.splice(price, 1);
            }
        }
        await this.setState({
            checkedPrices
        });
    }

    handleSave() {
        const { updatingPrices } = this.state;
        const convertedPrices = ConvertUpdatingPrices(updatingPrices);
        axios({
            method: 'post',
            url: 'http://40.70.129.139/api/v1/fuel/wholesale/bpm/ui/transaction/update',
            data: convertedPrices,
            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
            },
        }).catch(error => {
            console.log(error);
        }).then(res => {
            console.log(res);
            this.setState({
                priceSaved: true
            });
        });

    }

    render() {
        const {
            users, customers, customerSites, currentPage, perPage, upperPageBound, lowerPageBound, selectItem, selectSubItem, priceDetails, toggleOpen, checkedPrices, priceSaved
        } = this.state;

        const indexOfLastCustomer = currentPage * perPage;
        const indexOfFirstCustomer = indexOfLastCustomer - perPage;
        const currentCustomerSites = customerSites.length === 1 ? customerSites : customerSites.slice(indexOfFirstCustomer, indexOfLastCustomer);
        const last = Math.ceil(customerSites.length / perPage);
        const lastItem = currentCustomerSites.length;
        let pageNumbers = [];
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && currentPage === 1) {
                return (
                    <PaginationItem key={number} active={pageNumbers[currentPage - 1] === (number) ? true : false} id={number}>
                        <PaginationLink onClick={this.handlePageClick.bind(this, number)} key={number} id={number}>{number}</PaginationLink>
                    </PaginationItem>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                return (
                    <PaginationItem key={number} active={pageNumbers[currentPage - 1] === (number) ? true : false} id={number}>
                        <PaginationLink onClick={this.handlePageClick.bind(this, number)} key={number} id={number}>{number}</PaginationLink>
                    </PaginationItem>
                )
            }
        });
        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <PaginationItem><PaginationLink onClick={this.btnIncrementClick.bind(this)}> &hellip; </PaginationLink></PaginationItem>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <PaginationItem><PaginationLink onClick={this.btnDecrementClick.bind(this)}> &hellip; </PaginationLink></PaginationItem>
        }
        return (
            <div className="ExistingCustomers">
                <article className="row">
                    <div className="col-2" style={{ position: 'relative' }}>
                        <SidebarExistingCustomer
                            selectItem={selectItem}
                            selectSubItem={selectSubItem}
                            customers={customers}
                            currentCustomerSites={currentCustomerSites}
                            onCustomerChange={this.handleCustomerSelect.bind(this)}
                            onSubCustomerChange={this.handleSubCustomerSelect.bind(this)}
                            onCustomerSearch={this.handleCustomerSearch.bind(this)}
                        />
                        <Pagination style={{ position: 'fixed', bottom: 100, zIndex: 100 }}>
                            <PaginationItem>
                                <PaginationLink disabled={currentPage === 1} onClick={this.handleFirstClick.bind(this)}>{'<<'}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink disabled={currentPage === 1} onClick={this.handlePrevPage.bind(this)}>{'<'}</PaginationLink>
                            </PaginationItem>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            <PaginationItem>
                                <PaginationLink disabled={currentPage === last || currentCustomerSites.length === 0} onClick={this.handleNextPage.bind(this)}>{'>'}</PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink disabled={currentPage === last || currentCustomerSites.length === 0} onClick={this.handleLastClick.bind(this)}>{'>>'}</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </div>

                    <div className="col-10">
                        <div className="body-header">

                            <UserInfo
                                users={users}
                            />
                        </div>
                        <form>
                            <PriceTable
                                priceDetails={priceDetails}
                                priceSaved={priceSaved}
                                onUpdatePrice={this.handleUpdatePrice.bind(this)}
                                onCheckedPrice={this.handleCheckedPrice.bind(this)}
                            />

                            <div className="row fixed-button">
                                <div className="col-1 text-left  row-button">
                                    <input disabled={selectItem === 0} type="button" className="btn btn-success" value="<< Back" onClick={this.handlePrevItem.bind(this, currentCustomerSites[selectItem - 1])} />
                                </div>
                                <div className="col-1 text-left row-button">
                                    <input disabled={selectItem + 1 === lastItem} type="button" className="btn btn-success" value="Next >>" onClick={this.handleNextItem.bind(this, currentCustomerSites[selectItem + 1])} />
                                </div>
                                <div className="col-6"></div>
                                <div className="col text-right row-button">
                                    <button type="button" className="btn btn-secondary btn-save text-light" onClick={this.previewModal.bind(this)}>{toggleOpen ? 'Close' : 'Preview'}</button>
                                    <Modal
                                        users={users}
                                        isOpen={toggleOpen}
                                        toggle={this.previewModal.bind(this)}
                                        checkedPrices={checkedPrices}
                                    />
                                </div>
                                <div className="col text-right row-button">
                                    <input onClick={this.handleSave.bind(this)} type="button" className="btn btn-secondary btn-save" value="Save" />
                                </div>
                                <div className="col text-right emailSetup">
                                    <input type="checkbox" className="" value="" id="emailSetup" />
                                    <label className="font-weight-bold" htmlFor="emailSetup">Setup for Email</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        );
    }
}

export default ExistingCustomers;
