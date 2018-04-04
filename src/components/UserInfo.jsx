import React, {Component} from 'react';
import {Button} from "react-bootstrap";

export default class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parametre: "stateParametre",
            parametre1: "stateParametre1",
            parametre2: "stateParametre2"
        }
    }

    render() {
        return (this.__renderUsersInfo());
    }

    __renderUsersInfo = () => {
        let arr = [];
        let users = this.props.users;
        users.map((user) => {
            arr.push(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    <td>
                        <Button id={user.id} onClick={this.__onClickUpdate.bind(this, user.id)}>Düzenle</Button>
                        <Button id={user.id} onClick={this.__onClickDelete.bind(this, user.id)}
                                style={{marginLeft: 10}}>Sil</Button>
                    </td>
                </tr>
            );
        });
        return arr;
    };

    __onClickDelete = (id, e) => {
        this.props.onDelete(e, id)
    };

    __onClickUpdate = (id, e) => {
        this.props.onUpdate(e, id);
    }
}