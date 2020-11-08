// Learning objective: 
// - Understand how to update the Apollo Cache. 
// - Walk through the steps of updating the cache conceptually. 

// - Q: So how does update work? 
// - - I will pass update the cache as the update argument the I will pass another argument that appears to be a graphQL response, becuse it is. I will get back the graphQL response form the mutation I am trying to update. 
// - - In my example I would need to retrive back the data property of "addPet"
// - - Then the objetive is to read any query that might be interested in this new resource that I have created. In in my app I only have one query and that is the all pets query. But in the wild, I may have many queries that use petsList in various UI components throughout the application. And for every single one of these queries have to read them using the "cache.readQuery()". 
// - - The "cache.readQuery()"function takes as an argument a query that is that is a refrence to the query that I have created. For example in the context of pets my application I would pass the "cache.readQuery()" function the ALL_PETS query. But keep in mind that in large scale production apps I may have manyt queries that utalize the list of pets in a various UI components throught the UI application. And for every single one of those queries throught a large appilcaition I would have to read them using the "cache.readQuery()" function, and pass it a refrecen to the query that I would want to be updated, and the fields must be exactly the same because my graphql API is going to go look for and if their is any discrepency in the feilds then graphQL will not be able to retrive it. And is becasue GQL is actually watching the queries, and it needs a referecne. 
// -  and once that query is read, I will be able to get refercnce to the data on the Apollo Cache, and be able to reference its data. In my dogs app I would get back a refrence to an obect with pets on it. 
// - Then once I get back the object that asked for in my query then I would use the "cache.writeQuery()"
// - The ".writeQuery()"
// - Now, once I read the query I need to write back to the query. 
// - This behaviour is very similar to how apollo acts when I issue a query, using the useQuery() hook, which automatically write that particular query result  to its cache for me. I just need to do it automatically. 
// - So all I am doing is basically I am just going to take the cache and take my query and write to the cache myself. 

// Steps to updating the cache:
// 1) Read from the cache to access the query
// 2) Update the cache with the same, with the same query
// 3) Add a new state for the Apollo Cache 
// - - DO NOT: use imutateble operation, push, pop. Its immutable, and make sure that I do this as if apollo did this automatically. 

   





function AddToDo(){
    let input;
    const [addTodo] = useMuation(
        ADD_TODO,
        {
            update(cache, {data: {addTodo}}){
                   //  I am going to access the cache
                const {todos} = cache.readQuery({query: GET_TODOS});
                  // Then I am going to write to the cache myself   
                cache.writeQuery({
                    // For this given query "GET_TODOS" 
                    query: GET_TODOS,
                    // Im going to override it to be this data now 
                    data: {todos: todos.concat([addTodo])},
                    // - And in the above example:  I created a new todos array, based off the old to dos array, concatinated it with the new one that was just created. This will put the new to do to appear at the end of the list. In my app I should probably add the new pet to the beginning of the app and not at the end. 
                })
            }
        }
    )

    return(
        <div>
            <form 
                onSumbit={e => {
                    e.preventDefault();
                    addTodo({variables: {type: input.value}});
                    input.value = "";
                }}
            >
                
            </form>
        </div>
    )

}

