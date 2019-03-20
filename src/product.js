import React, { Component } from 'react';

class ProductHolder extends Component {
  render(){
    return (<div>
      {this.props.products.sort((a,b) => {
        return (b.score - a.score);
      }).filter((d,i)=>{
        return i < 5;
      }).map( pd => {
        return (<div style={{
          margin:'15px 0',
          border : '1px solid #CACACA',
          
        }} key={[pd.id,pd.price].join('_')}>
          <ProductIndiv {...pd} cart={this.props.cart.findIndex(d => d.id === pd.id) !== -1} manageCart={(v)=>this.props.manageCart(v)}/>
        </div>);
      })}
    </div>);
  }
}

class ProductIndiv extends Component {
  whenItemClicked(){
    this.props.manageCart(this.props.id);
  }
  
  render(){
    return (<div style={{
      display : 'flex',
    }}>
      <div style={{
        flex:1,
        textAlign:'center',
        paddingTop : 50,
      }}>
        <div>{this.props.title}</div>
      </div>
      <div style={{paddingTop : 50,width:80,textAlign:'center'}}>
        <div style={{marginBottom:10}}>{this.props.price + '원'}</div>
        {this.props.cart !== null ?
          <div style={{cursor:'pointer', border:'1px solid #CACACA'}} onClick={()=>this.whenItemClicked()}>
            {this.props.cart ? '빼기' : '넣기'}
          </div> : null}
      </div>      
      <div style={{width:300,height:150,textAlign:'right'}}>
        <img src={this.props.coverImage} height="150"/>
      </div>      
    </div>);
  }
}

export {ProductIndiv, ProductHolder};