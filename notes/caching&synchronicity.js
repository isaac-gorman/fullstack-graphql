// Q: Why is the cache out of sync in the first place? 
// - If I preform a mutation that updates or creates a single node, then apollo will udpate your cache automatiacly give that the muation has the same fields and id.
//  
// - But if a preform a muation that updates a node in a list or removes a node, I am responsible for updating any query refrecnig that list or node. There are many methods to update a particular node in a cache list in apollo. 

// -- No automatic update -- 
// - In the context of the previous mutation of creating a new pet, there is no matching id or fields with any node in the list of pets. Also I am not updating just one node, but a list. Therefor I must update it manually.
// - Even though I added a new node to the list of pets, Apollo has no idea that I want to associate that added node to the list of pets I am rendering in my UI. This is by design, if the list of pets that I am rendeirng on the screen where to be updated automatically then I would run into some unwanted side effects. Because maybe the array of pets that I am rendering on the screen has a specfic for the current view, it is for a another view in anothe page. I want control over this. 
// - Same goes with deleting a node in a list. I must do it myself. 
// - This is good though, this functionallty enables you to have various list of nodes that I am refrecing on the page from the same type of list, but each component dispalys the list of nodes differently. 
// - And in the context of updating our UI we must give the same fields to the apollo client to update in the cache

//  - - As far as what you udpate on the server side, is irrelavent to what what occurs on the front end, its what you send back. If I only update two fields thats fine, as long as I send back the exact fields that the query wants that good.  As long as the id matches the intened node   - -

// Q: So how would I keep the cache in sync? 
// - Refetching matching queries after muations: 
// - - Apollo has built in helper methods called "refetch()" to refetch queries after mutation. We would have to sign up to be notfied in case of upadated queries. They are called watch queries  
// - Use update method on mutation:  What we will do. Basically, I will write a reducer, but the only difference from redux is instead of writing to update in the redux store, I will be writing to Apollos Cache. Which is Apollos internal state.  I must write to the cache myself. 
// - - The Apollo cache is not like a key value store, I have to query the cache with graphQL and I have to write to the cache with graphql.  
// - - The reason that is, is beacuse that is how graphQL knows, what has what in its nodes, is via the watch queries. So if my intention is to retrive items in the cache in order to update UI components, and in my sitiation I will be retrive all the nodes of pets from a all pets array. Then I will write a new pet to it, then I will write it back with the same exact query. 
// - - Q: So why is this better then just requerying form the database?   
// - - - In terms of latancey, having to make another API call is going to difference of users having to wait a few seconds vs, doing something in memory that is instant. Especially if I set up everything correctly, as in my mutations return the exact same fields, I named my queries and I have refrenced them via variables updating the cache is simple and improves user experince and data usage. As long as I have the queries and the exact fields on my mutataions it just works. 
// - - Q: But is there other ways to make the API call again, espacially if I wanted something on demand or on the click of a button? 
// - - - Then I would have to use the client directly and I would have to hook that API call to button handler. And don't use a hook if I want direct control over a query. 
// - Watch Queries: 


// 





