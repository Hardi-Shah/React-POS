import './App.css';
import Navbar from './components/Layout/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import Home from './components/Categories/Pages/Home';
import "font-awesome/css/font-awesome.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import NotFound from './components/Categories/Pages/NotFound';
import AddCategory from './components/Categories/CategoryList/AddCategory';
import EditCategory from './components/Categories/CategoryList/EditCategory';
import Category from './components/Categories/CategoryList/Category';

import Home from './components/Products/Pages/Home';
import NotFound from './components/Products/Pages/NotFound';
import AddProduct from './components/Products/ProductList/AddProduct';
import EditProduct from './components/Products/ProductList/EditProduct';
import Product from './components/Products/ProductList/Product';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar />
       <Home/> */}
         {/* <Switch>
          <Route exact path="/" component={Home} />
           <Route exact path="/categories/add" component={AddCategory} /> 
          <Route exact path="/categories/edit/:id" component={EditCategory} />
          <Route exact path="/categories/:id" component={Category} />
          <Route exact path="/NotFound" component={NotFound} />
        </Switch> */}

        <Switch>
          <Route exact path="/" component={Home} />
           <Route exact path="/products/add" component={AddProduct} /> 
          <Route exact path="/products/edit/:id" component={EditProduct} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/NotFound" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
