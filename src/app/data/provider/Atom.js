import { atom } from "recoil";
import { User } from "../models/User.model";
import {Cart} from "../models/Cart.model";

//Check loggedin
export const IsLoggedAtom = atom({
    key: 'isLogged',
    default: false
})

//User data
const user = new User("", "", "")
export const UserDataAtom = atom({
    key: "userData",
    default: user
})

//Cart Data
export const CartDataAtom = atom({
    key: "cartData",
    default: []
})