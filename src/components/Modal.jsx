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
    ModalHeader
} from 'react-bootstrap';

export default class Modal extends Component {


    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.showModal}>
                    <ModalHeader>
                        <Modal.Title>{this.state.confirmButtonText} User</Modal.Title>
                    </ModalHeader>

                    <ModalBody>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Username
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        defaultValue={this.props.selectedUser.username}
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
                                        defaultValue={this.props.selectedUser.age}
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
                        <Button onClick={this.__onSubmit} bsStyle="primary">{this.props.confirmButtonText}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}