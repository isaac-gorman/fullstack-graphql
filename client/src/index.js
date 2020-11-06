import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './components/App'
import './index.css'
import client from './client'

const Root = () => (
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}

// I need to hook up Apollo to react
// - I will accomplish this by wrapping a Apollo provider around the portion of the view of my react app I want to run queries from. And pass the Apollo provider the apollo client prop I just made. 
// Q: How does this work? 
// - - Apollo Providor leverages Reacts context api to expose the children components within the App component to have access to the data that the Apollo client has stored in the Apollo Cache. In the conext of this app that will be the pets infromation that will be queried for using GraphQL api server, that retrivers it from our database (in our case it is an in memory lowdb database)