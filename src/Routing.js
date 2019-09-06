import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    BrowserRouter,
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import { Redirect } from 'react-router';

import {login} from './pages/login/actions';
import {loading} from './layout/actions';

// PAGES 
import Login from './pages/login/Login';


import {APP_PATHS} from './config';

class Routing extends Component {

    constructor(props){
        super(props);

        this.state = {
            readyToRender   : false
        }
    }

    
    componentWillReceiveProps(nextProps){

        this.setState({
            readyToRender : true
        });

    }

    componentWillMount() {
        this.setState({
            readyToRender : true
        })
    }

    renderRoutes(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path={APP_PATHS.HOME} component={withRouter(Login)} />
                    <Route exact path={APP_PATHS.LOGIN} component={withRouter(Login)} />

                </Switch>
            </BrowserRouter>
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.readyToRender ? this.renderRoutes() : null }
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        AUTHORIZED  : state.AUTHORIZED
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            login,
            loading
        }, dispatch ),

        dispatch
    }
}

const PrivateRoute = ({component: Component, authed, ...rest})=>{
    return (
        <Route
            {...rest}
            render={(props) => (authed === true) ? <Component {...props} /> : <Redirect to={APP_PATHS.LOGIN} />}
        />
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routing));