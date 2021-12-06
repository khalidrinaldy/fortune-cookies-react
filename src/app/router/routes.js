import { Switch, Route } from "react-router";
import LoginView from "../modules/view/authentication/login.view";
import { CartView } from "../modules/view/cart/cart.view";
import { Bread } from "../modules/view/category/bread.view";
import { Cake } from "../modules/view/category/cake.view";
import { Chocolates } from "../modules/view/category/chocolates.view";
import { Cookies } from "../modules/view/category/cookies.view";
import { HistoryView } from "../modules/view/history/history.view";
import Dashboard from "../modules/view/home/dashboard.view";

export default function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/login">
                <LoginView />
            </Route>
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
            <Route path="/cart">
                <CartView />
            </Route>
            <Route path="/history">
                <HistoryView />
            </Route>
        </Switch>
    );
}