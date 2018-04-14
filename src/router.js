import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import App from "./App";
import Greeting from "./components/Greeting";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";
import {Col, ListGroup, ListGroupItem} from "react-bootstrap";

const router = () => (
    <Router>
        <Col sm={12}>
            <Col className={"col-sm-3"}>
                <Col style={{marginTop: 90}}>
                    <ListGroup>
                        <ListGroupItem><Link to="/app">Go to User Crud Page</Link></ListGroupItem>
                        <ListGroupItem><Link to="/greeting">Go to Greeting Page</Link></ListGroupItem>
                    </ListGroup>
                </Col>
            </Col>

            <Col className={"col-sm-9"}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/app" component={App}/>
                        <Route exact path="/greeting" component={Greeting}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Col>

        </Col>
    </Router>
);

export default router;