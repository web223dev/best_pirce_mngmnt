import React, { Component } from 'react';

class UserInfo extends Component {
    render() {
        const { users } = this.props; 

        const userDetail = (users && users !== null) ? (
            users.map((user, index) => {
                return (
                    <div className="justify-content-between bg-white" key={index}>
                        <table className=" table">
                            <thead>
                                <tr>
                                    <th>Customer Type</th>
                                    <th>Customer Name</th>
                                    <th>Site Name</th>
                                    <th>Site ID</th>
                                    <th>Customer Email</th>
                                    <th>Best Price Contact</th>
                                    <th>Ship to Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> {user.bid ? ' Existing customer' : 'Price plan'}</td>
                                    <td>{user.orgParentName}</td>
                                    <td> {user.orgName}</td>
                                    <td> {user.orgCode} - {user.orgSubcode}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dbcFirstName} {user.dbcLastName}</td>
                                    <td>{user.street}, {user.state}. {user.city}, {user.zip}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div >


                )
            })
        ) : (
                <h1>Loading...</h1>

            )

        return (
            <div>{userDetail}</div>
        );
    }
}

UserInfo.defaultProps = {
    users: []
};

export default UserInfo;