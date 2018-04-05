import React, {Component} from 'react';
import {
    Button,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'react-bootstrap';
import UserInfo from "./components/UserInfo";
import Timer from "./components/Timer";
import axios from 'axios';


const PATH = "http://localhost:3000/";
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showModal: false,
            buttonDisabled: false,
            confirmButtonText: "Add",
            operationType: "create",
            selectedUser: {
                username: "",
                age: ""
            }
        }
    }

    userInfoRef = null;

    render() {
        return (
            <div style={{padding: 20}}>
                <div>
                    <Timer timeUp={this.__timeUpApp} className="pull-left"/>
                    <Button className="pull-right" onClick={this.__onNewClick}
                            disabled={this.state.buttonDisabled}> Yeni Ekle </Button>
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Age</th>
                        <th>Commands</th>
                    </tr>
                    </thead>
                    <tbody>
                    <UserInfo
                        ref={(ref) => {
                            this.userInfoRef = ref
                        }}
                        onUpdate={this.__onUpdateClick}
                        onDelete={this.__onDeleteClick}
                        users={this.state.users}/>
                    </tbody>
                </Table>
                {this.__renderModal()}
            </div>
        );
    }

    __timeUpApp = () => {
        this.userInfoRef.doButtonDisabled();
        //this.userInfoRef.setState({}); diğer yöntem
        this.setState(() => {
            return ({buttonDisabled: true});
        });
    };

    __onDeleteClick = (event, id) => {
        axios.delete(PATH + "users/" + id).then(() => {
            this.__getAllUsers();
            this.__closeModal();
        });
    };

    __onUpdateClick = (event, id) => {
        axios.get(PATH + "users/" + id).then(
            (response) => {
                this.setState({selectedUser: response.data, operationType: "update", confirmButtonText: "Update"});
                this.__openModal();
            }).catch((error) => {
            console.log(error);
        });
    };

    __onNewClick = () => {
        this.setState({operationType: "create", confirmButtonText: "Add"});
        this.__openModal();
    };


    __renderModal = () => {
        return (
            <div className="static-modal">
                <Modal show={this.state.showModal}>
                    <ModalHeader>
                        <Modal.Title>Add User</Modal.Title>
                    </ModalHeader>

                    <ModalBody>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Username
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        defaultValue={this.state.selectedUser.username}
                                        onChange={this.__handleChange.bind(this)}
                                        name="username"
                                        type="text"
                                        placeholder="Username"/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Age
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        defaultValue={this.state.selectedUser.age}
                                        onChange={this.__handleChange.bind(this)}
                                        name="age"
                                        type="text"
                                        placeholder="Age"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={this.__closeModal}>Cancel</Button>
                        <Button onClick={this.__onSubmit} bsStyle="primary">{this.state.confirmButtonText}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

    __onSubmit = () => {
        if (this.state.operationType === "create") {
            axios.post(PATH + "users", this.state.selectedUser).then(() => {
                this.__getAllUsers();
                this.__closeModal();
                this.__clearSelectedUser();
            })
        } else {
            axios.put(PATH + "users/" + this.state.selectedUser.id, this.state.selectedUser).then(() => {
                this.__getAllUsers();
                this.__closeModal();
                this.__clearSelectedUser();
            })
        }
    };

    __clearSelectedUser = () => {
        this.setState({selectedUser: {}});
    };

    __handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let selectedUser = this.state.selectedUser;
        selectedUser[name] = value;
        this.setState({selectedUser: selectedUser});
    };

    __openModal = () => {
        this.setState((props, state) => {
            return ({showModal: true});
        });
    };

    __closeModal = () => {
        this.setState({showModal: false});
    };

    __getAllUsers = () => {
        axios.get(PATH + 'users')
            .then((response) => {
                this.setState({users: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.__getAllUsers();
    }
}
