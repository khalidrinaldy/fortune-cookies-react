import { useEffect, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import { User } from './app/data/models/User.model';
import { CartDataAtom, IsLoggedAtom, UserDataAtom } from './app/data/provider/Atom';
import { ApiService } from './app/modules/services/ApiService';

function App() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [userData, setUserData] = useRecoilState(UserDataAtom)
  const [isLogged, setIsLogged] = useRecoilState(IsLoggedAtom)
  const [cartData, setCartData] = useRecoilState(CartDataAtom);
  const apiService = new ApiService()

  const getUser = async () => {
    const res = await apiService.getUser()
    if (res != null) {
      const data = res["data"]
      const user = new User(
        data["ID"],
        data["email"],
        data["token"]
      )
      await getCart(data["token"]);
      setUserData(user)
      setIsLogged(true)
    }
  }

  const getCart = async (token) => {
    const res = await apiService.getCartList({ token: token });
    const data = res["data"];
    let items = [];
    for (const index in data) {
      items.push({
        id: data[index]["ID"],
        productId: data[index]["Product_Id"],
        productName: data[index]["Product_Name"],
        productPrice: data[index]["Product_Price"],
        productImage: data[index]["Product_Image"],
        amount: data[index]["Amount"]
      })
    }
    setCartData(items);
  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {

  }, [userData, cartData])

  return (
    <div className="App">

    </div>
  );
}

export default App;