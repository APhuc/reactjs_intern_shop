import ProductFuture from 'features/Product';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import PageNotFound from 'features/Product/pages/PageNotFound';
import Footer from 'components/Footer/Footer';
import CartFeature from './components/DetailCart/DetailCart';
import Intro from 'components/Intro/Intro';
import StepBuyProduct from 'components/StepByProduct/StepBuyProduct';
import Category from 'components/Category/Category';
import Listproduct from 'components/ListProduct/ListProduct';

function App() {

    return (
        <div className='app'>
            <Header />
            <Intro />
            <Category />
            <Listproduct />
            <StepBuyProduct />

            <Switch>
                <Route path="/" exact />
                {/* <Route path="/" component={CounterFeature} exact />
                <Route path="/todos" component={TodoFeature} />
                <Route path="/album" component={AlbumFeature} /> */}
                <Route path="/products" component={ProductFuture} />
                <Route path="/cart" component={CartFeature} />

                <Route path='' exact={false} component={PageNotFound} />
            </Switch>

            <Footer />
        </div>
    );
}

export default App;