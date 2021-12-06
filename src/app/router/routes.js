import { Switch, Route, Redirect } from "react-router";
import LoginView from "../modules/view/authentication/login.view";
import { CartView } from "../modules/view/cart/cart.view";
import { Bread } from "../modules/view/category/bread.view";
import { Cake } from "../modules/view/category/cake.view";
import { Chocolates } from "../modules/view/category/chocolates.view";
import { Cookies } from "../modules/view/category/cookies.view";
import { HistoryView } from "../modules/view/history/history.view";
import Dashboard from "../modules/view/home/dashboard.view";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    user != null
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

function LoginRoute({ children, isAuthenticated, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    user == null
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

export default function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <LoginRoute path="/login">
                <LoginView />
            </LoginRoute>
            <Route path="/cookies">
                <Cookies />
            </Route>
            <Route path="/cake">
                <Cake />
            </Route>
            <Route path="/bread">
                <Bread />
            </Route>
            <Route path="/chocolates">
                <Chocolates />
            </Route>
            <PrivateRoute path="/cart">
                <CartView />
            </PrivateRoute>
            <PrivateRoute path="/history">
                <HistoryView />
            </PrivateRoute>
        </Switch>
    );
}