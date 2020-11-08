// Overview:
// - I will learn how to manage local state with Apollo, and GraphQL using client side schemas and adding a directive

// Client Side Schemas
// - I have already covred how to create server side schemas, and they have their similarties with clients side.

// Q: Why do I need client side schemas, in addition the schema that I have written on the server side? 
// - - On top of managing data from the API, apollo client can also store data in local state in the front end app. 
// - - Data that I would normally store in Redux and Vuex, I would simply create a schema to define that state which allows you to query for that state the same way I would query from the API for data.
// - - AKA I can define the state that I create locally is the same way I define state on the server through a schema.
// - - Then I could use GQL queries to retrive that state, and combine queries that I used to retrive state form the server. I would not have to make sperate queries for local, and server side state. The query would could access both from just one client side schema and apollo would resolve those queries for me with limited to no issues. 

// Q: How would I write an Apollo Client schema? 
// - - I would would write the client schema the same way as the server schema. I would just need to extend the Types from the server schema. Then with the use of an Apollo mechinims called a "directive" (which I will cover next lecture) I will be able to acces local state from your queries and mutations. 

