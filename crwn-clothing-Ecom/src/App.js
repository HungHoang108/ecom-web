import {React, useContext} from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import { CheckOut } from "./routes/checkout/checkout.component";
import { CategoryRoute } from "./routes/category/category.route";
import { CategoriesContext } from "./contexts/categories.context";


// const Shop = () => {
//   return <h1>I am the shop page</h1>;
// };

const App = () => {
  const {categoryTitle} = useContext(CategoriesContext)
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop/>} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
