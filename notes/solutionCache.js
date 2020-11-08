//  Use Mutation can take an optional second argument which is an object
//  In that object I can provide a method called update() which is going to be called after the mutation has processed, and this give me complete control of the cache in order to update the cache with whatever I want based on the muations results. 
//  Thus the update method recives two arguments: 
// - 1: The "cache" that apollo is using internally 
// - 2: Then I am going to recieve the exact response that the mutation is going to return from the server. This object must be exactlly what my Apollo server would return. 
// - - The muation response will always return a {data: {}} with whatever the mutation name was considering if I used an alias or not.   

// - 3: Then the strategy would be to find any query that would need to be informed on the update that I just preformed

// Applied to the dog app
// - I have a query that is displaying a list of pets, and we just created a pet so that query would need to know about that new pet, so therefor it can update the cache properly without a the user having to refresh the page, and instead having us programatically triggering a re-render each time a newPet is added to the list

//  Utalizing the cache:
// - I can read any query that I would want based on the query that I have reference to. 
// - Then I could just write back to that query that I have refernced to and set the new data myself
// - using data, aka the same thing the server would respond with aka an object with a data property, follwed by the name of the query, followed by the updated value of that key that would be the new value of the list 

