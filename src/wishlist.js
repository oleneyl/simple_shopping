import React, { Component } from 'react';
import {ProductIndiv} from './product';

class WishlistProduct extends Component {
  
  render(){
    return (
      <div style={{display:'flex', border:'1px solid #CACACA', margin:'15px 0'}}>
        <div style={{flex:1}}>
          <ProductIndiv manageCart={(v)=>{}} {...this.props} cart={null}/>
        </div>
        <div style={{width:50, paddingTop : 45, margin : '0 10px'}}>
          <input style={{width:35}} 
            type='number' 
            onChange={(e) => this.props.whenProductVaryed(this.props.uid, e.target.value)} 
            defaultValue={this.props.amount}/>
          <input 
            type='checkbox' 
            onChange={(e) => this.props.whenProductSelected(this.props.uid, e.target.checked)}
            checked={this.props.checked}/>
        </div>
      </div>
    );
  }
}

class WishlistHolder extends Component {
  /*
  -- props --
  coupon : currently using coupon. if no counpon, is null.
  products : currentyl selected products.
  */
  calculateTotalPrice(){
    let totalPrice = this.props.products.reduce( (acc, curr) => {
      let price = curr.price * curr.checked * curr.amount;
      if(price > 0 && this.props.couponIndex >= 0 && curr.availableCoupon !== false){
        let selectedCoupon = this.props.coupons[this.props.couponIndex];
        if(selectedCoupon.type === 'rate'){
          price = price * (1 - 0.01 * selectedCoupon.discountRate);
        }else if(selectedCoupon.type === 'amount'){
          price -= selectedCoupon.discountAmount;
        }
      }      
      return acc + price;
    }, 0);

    return Math.floor(totalPrice);
  }
  
  render(){
    let products = this.props.products.map(pd => {
      return <WishlistProduct key={pd.uid} {...pd}
                  whenProductSelected={(uid,checked) => this.props.whenProductSelected(uid, checked)}
                  whenProductVaryed={(uid,value) => this.props.whenProductVaryed(uid, value)}/>;
    });
    
    return (
    <div>
      <div style={{minHeight:400, border : '1px solid #CACACA', padding : '0 10px'}}>
        {products}
      </div>
      <div style={{border:'1px solid #CACACA', display:'flex',paddingTop:15,paddingBottom : 15}}>
        <div style={{flex:5, marginLeft:15}}>
          <div style={{marginBottom:5}}>
            사용할 쿠폰을 선택하세요.
          </div>
          <select onChange={(e) => {this.props.manageCoupon(e.target.selectedIndex-1)}}>
            <option key={'사용하지 않음'} value={'사용하지 않음'} selected={this.props.couponIndex<0}>{'사용하지 않음'}</option>
            {this.props.coupons.map((cp,idx) => <option key={cp.title} value={cp.title} selected={this.props.couponIndex === idx ? true : null}>{cp.title}</option>)}
          </select>
        </div>
        <div style={{flex:1, textAlign:'right', marginRight:15}}>
          <div>
            가격
          </div>
          <div style={{fontSize:'24px'}}>
            {this.calculateTotalPrice()}
          </div>
        </div>
      </div>
    </div>)
  }
}

export {WishlistHolder};