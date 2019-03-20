

Simple Shopping Demo
------------------------

Simple shopping site demo page.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



- How to run
  
  *npm start* will start this app in localhost:3000.
  you can access page /products, /wishlist.

  you can also build with npm run build, if you do not want to run on dev env.


- Routers
  
  - /products/{page}
    
    Show products in given ``page``.
    invalid ``page`` will be redirected to /products/1.

  - /wishlist
    
    Show client's wishlist and calculates budget.


- Used Library 


  - create-react-app : 빠른 React 개발환경 구축을 위해 활용
  - react-router-dom : Routing 구현을 위해 활용
  - react-cookie : 쿠키 사용을 위해 활용