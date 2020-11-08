import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {ApolloLink} from 'apollo-link'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */




//  Creating a new Apollo Client in 3 steps 
//  1) Apollo Link: Network interface to access the graphql server. It operates at the network level. This link will point Apollo to the GraphQL Server. http://localhost:4000/. I am telling Apollo that my API is operating at this link: http://localhost:4000/.
const http = new HttpLink({uri: 'http://localhost:4000/'});
const delay = setContext(
    request => 
        new Promise((success, fail) => {
            setTimeout(()=>{
                success()
            }, 800)
        } )
)
const link = ApolloLink.from([
    delay,
    http
])

// 2) Apollo Cache: By default Apollo provides you with a cache called InMemoryCache from 'apollo-cache-inmemory'
const cache = new InMemoryCache()

// 3) Intialze the client  
const client = new ApolloClient({
    link,
    cache
})

// Creating a simple gql query
// const query = gql`
// {
//     characters{
//         results{
//             name
//             id
//         }
//     }
// }
// `

// client.query({query})
//     .then((result) => console.log(result))
// the result will come back as data. Every GQL request will respond with a data object, and errors for errors


export default client

// Apollo dev tool extension: 
// - This Apollo dev too extension on the chrome browser uses the same client as the client we created.
// - If the client we created as other dependancies such as Authentication or anything else that is hooked up to our client the Apollo dev tool extension is using it
// Q: How does the Apollo cache store the data that we just queried for? 
// - - Apollo flattens the data and stores it flat 
// - - if I were to update any character in the cache such as character 19, character 19 would also be updated in the cache, and any view (UI element) element would update to render the updates. If my application was written in a reactive way. Which the react libray helps to do. 