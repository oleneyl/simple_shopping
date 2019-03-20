import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductHolder extends Component {
  render(){
    let startPoint = Math.max(parseInt(this.props.match.params.page,10) || 1, 1) - 1;
    let productPerPage = 5;
    let viewPerPage = 5;
    
    let startPage = Math.floor(startPoint / viewPerPage) * viewPerPage;
    let totalPage = Math.min(Math.floor((this.props.products.length-1) / productPerPage)+1, 
                                startPage + viewPerPage);
    
    let indexer = [...Array(totalPage-startPage).keys()].map( (d,i) => {
      return (
      <div style={{width:20,height:20,border:'1px solid #CACACA', margin:'0 3px'}} key={i + startPage + 1}>
        <Link to={'/products/'+(i + startPage + 1)} style={{textDecoration:'none'}}>{i+startPage+1}</Link>
      </div>);
    });
    
    return (<div>
      {this.props.products.sort((a,b) => {
        return (b.score - a.score);
      }).filter((d,i)=>{
        return (i < (productPerPage * (startPoint+1))) && (i >= (startPoint * productPerPage));
      }).map( pd => {
        return (<div style={{
          margin:'15px 0',
          border : '1px solid #CACACA',
          
        }} key={[pd.id,pd.price].join('_')}>
          <ProductIndiv {...pd} cart={this.props.cart.findIndex(d => (d.id === pd.id && d.price === pd.price)) !== -1} manageCart={(v)=>this.props.manageCart(v)}/>
        </div>);
      })}
      <div style={{marginBottom : 250}}>
        <div style={{textAlign:'center',width:200,display:'flex'}}>
          {indexer}
        </div>
      </div>
    </div>);
  }
}

class ProductIndiv extends Component {
  whenItemClicked(){
    this.props.manageCart(this.props.id+'_'+this.props.price);
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
            {this.props.cart ? '빼기' : '담기'}
          </div> : null}
      </div>      
      <div style={{width:300,height:150,textAlign:'right'}}>
        <img src={this.props.coverImage} height="150"/>
      </div>      
    </div>);
  }
}

export {ProductIndiv, ProductHolder};