// Overview: 
// - Walk through how optmistic UI avoids delays, by allowing a local update  before any server upate occurs. Optamistic UI updates itself, anticipates the response from the API, and proceeds as if the API call was optamistic. 

// Q: What is optimistic UI? 
// - Its the oppiste of displaying a spinner when updating components on the screen. 
// - Optamistic UI is fast filling UI. Instead of a spinner display the skeloton of the component, and load in the information of that data gradually as it is delivered from the server. 
// - The UI is optamistic that the server is going to respond back with what information is needed to fill in the component that I am rendering on the screen already. For example think of how Youtube displays the skeloton of the components before the server responds with the video data to fill those components on the screen.  
// - With Apollo we can get an optamistic update for free with apollo. Where we just update our local app  first before the server even comes back, and if there is some discrepency between the data on the users local app, and the server then the user will experince some lag, but if there is not a difference in the data, the user will never notice.  

// Q: So what is the technical defintion of Opimistic UI? 
// - - The UI does not wait untill after a mutation operation to update itself. Instead, it anticipates the server responses from the API and proceeds as if the API call was in sync. Then the API response replaces the generated on. This gives the illusion of your network being really fast. 

//  Q: How do you implement this Optimistic UI with mutations? 
// - - Apollo provides a hook that enables me to write to the local cache after a mutation.
// - - Note that this isn't what I just did with the readQuery(), and writeQuery()  methods within the update() method. update() is being fired after the mutation has completed and come back from the server 
// - - Optimistic UI occurs as soon as I execute the mutation, before the server responds.   

// Q: What are Apollo-Links, and what are their relationships with http-responses? 
// To truly understand this I will implement a delay in response to the server after I have fired off a mutation. Using an apollo-link that acts similar to middleware, these apollo-links can be configured to accomplish whatever I want. What makes links so useful is in the many ways they can be used, I could have a link that intercepts a JWT from local storage, a link that places something in the header, or a link that logs something to the console. Apollo-Links are very similar to Angulars http-intercepters. 
// - Apollo-Links are meant to be used to conduct some action before and or after responses fire.
// - I will be configuring an Apollo-Link to delay the network after a mutation is preformed on the users data.  


// Q: Once I delay the network, how would I implement an Optamitic UI response after I created a mutation? 
// - There are two places that I could implement an Optismistic UI update. AKA utalizing the object "optimiticResponse: {}"
// - 1 ) passing "optimisticResponse: {}" as key to the useMutation() hook. 
// - 2 ) passing "optimisticResponse: {}" as key in the createPets() mutation function that I wrote to be triggered within my onSubmit function 
// THE DIFFERENCE in implementations: It depends on what I need access to.
// - - Calling the oR: {} in useMutation(), it will be used everytime the createPets function is invoked. AKA it has global access to createPets. But if I wanted access to any of the mutation variables I would not have access to them. The varibles aren't being used till I actually call the function. But what if I would need access to the optamistic repsonse? Then I would access them from within the actually onSubmit button. 
// - - Calling it within the onSubmit instance it would only be inkoved once.  
// * Again remember that my objective is to return an object that looks exactly like the object I just sent to the server to cause a mutation, to improve user experince. And this should be easy beacuse I know exactly what I am getting back from the server becasue I am using GQL, a very explict schema definition languge to wirte my queries. If I want to know I would just refrence the muatation, which is an exact copy of the query  
// - So in additon to passing the optimisticResponse: {} object the matching mutation object I must pass it a few extra things that Apollo provides under the hood. Such as: 
// - - - : "__typename" field. This is the name of the type that I am trying to retrive
// - - - : 
