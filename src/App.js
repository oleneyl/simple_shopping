import React, { Component } from 'react';
import {productItems, coupons} from  './data';
import {ProductHolder} from './product';
import { Route, NavLink } from 'react-router-dom';
import {WishlistHolder} from './wishlist';

class App extends Component {
  manageCart(id){
    if(this.state.cart.findIndex(d => d.id === id) !== -1){
      let idx = this.state.cart.findIndex(d => d.id === id);
      let newCart = this.state.cart.map(d => d);
      newCart.splice(idx,1);
      this.setState({cart : newCart});
    }else{
      if(this.state.cart.length < 3){
        this.setState({cart : this.state.cart.concat({
          ...productItems.find(d => d.id === id),
          amount:0,
          checked:false,
          uid:this.state.cartCount
        }), cartCount : this.state.cartCount+1});
      }else{
        window.alert('상품은 최대 3개까지만 담을 수 있습니다');
      }
    }
  }
  
  manageWishlist(uid, value, runningType){
    let newCart = this.state.cart.map(d=>d);
    let idx = newCart.findIndex(d => d.uid===uid);
    if(runningType==='select'){
      newCart[idx].checked=value;
    }else if(runningType==='vary'){
      newCart[idx].amount=Math.max(0,value);
    }
    this.setState({cart:newCart});
  }
  
  state = {
      products : productItems,
      cart : [],
      cartCount : 0,
      couponIndex : -1,
  }
  
  manageCoupon(idx){
    this.setState({couponIndex : idx});
  }
  
  render() {
    
    return (
      <div style={{display:'flex'}}>
        <div style={{flex:1}}/>
        <div style={{flex:5}}>
          <div style={{display:'flex', padding:'30px 50px', border : '1px solid #CACACA'}}>
            <div style={{flex:1}}>데모 페이지</div>
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
          <Route exact path = "/wishlist" render = {(props) => {
            return (<WishlistHolder products={this.state.cart}
                                    couponIndex={this.state.couponIndex}
                                    coupons={coupons}
                                    whenProductSelected={(uid, v)=>this.manageWishlist(uid,v,'select')}
                                    whenProductVaryed={(uid, v)=>this.manageWishlist(uid,v,'vary')}
                                    manageCoupon={(i)=>this.manageCoupon(i)}
              
            />);
          }}/>
        </div>
        <div style={{flex:1}}/>    
      </div>
    );
  }
}

export default App;
