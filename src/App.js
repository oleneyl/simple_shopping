import React, { Component } from 'react';
import {productItems, coupons} from  './data';
import {ProductHolder} from './product';
import { Route, Redirect, NavLink } from 'react-router-dom';

class App extends Component {
  manageCart(id){
    if(this.state.cart.indexOf(id) !== -1){
      let idx = this.state.cart.indexOf(id);
      let newCart = this.state.cart.map(d => d);
      newCart.pop(idx);
      this.setState({cart : newCart});
    }else{
      if(this.state.cart.length < 3){
        this.setState({cart : this.state.cart.concat(id)});
      }else{
        window.alert('상품은 최대 3개까지만 담을 수 있습니다');
      }
    }
  }
  
  state = {
      products : productItems,
      cart : [],
  }
  
  render() {
    
    return (
      <div style={{display:'flex'}}>
        <div style={{flex:1}}/>
        <div style={{flex:5}}>
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>'데모 페이지'</div>
            <div style={{width:120}}>
              <NavLink to={'/products'}>Products</NavLink>
            </div>
            <div style={{width:120}}>
              <NavLink to={'/wishlist'}>장바구니</NavLink>
            </div>
          </div>
          <Route exact path = "/products" render = {(props) => {
              return (<ProductHolder products={this.state.products}
                                    cart={this.state.cart}
                                    manageCart={(v)=>this.manageCart(v)} />);
            }}/>
        </div>
        <div style={{flex:1}}/>    
      </div>
    );
  }
}

export default App;
