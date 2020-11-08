import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'
import { OptimisticCacheLayer } from 'apollo-cache-inmemory/lib/inMemoryCache'


const ALL_PETS = gql`
query AllPets {
  pets{
    id
    name
    type
    img
  }
}
`
 
const NEW_PET = gql`
  mutation CreatePet($newPet: NewPetInput!){
    addPet(input: $newPet){
      id
      name
      type
      img
    }
  }
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  // As and argument useQuery will take a GraphQL query
  const {data, loading, error} = useQuery(ALL_PETS)

  const [createPet, newPet] = useMutation(NEW_PET, {
    update(cache, {data: {addPet}}){
      const data = cache.readQuery({query: ALL_PETS});
      cache.writeQuery({
        query: ALL_PETS,
        data: {pets: [addPet, ...data.pets] }
      })
    }
  })

  if(loading){
    return <Loader/>
  }

  if(error | newPet.error ){
    return <p>error</p>
  }

  // const pets = data
  console.log('loading:', loading)
  console.log("data:", data)
  console.log("error:", error)

  const onSubmit = input => {
    setModal(false)
      createPet({
        variables: { newPet: input},
        // I am going to implement the O_UI response so that I have access to the input arguments, which will enable me to get as close as possible to the result of the server, which minimized the interaction of the server response coming in and replacing the hard coded data that I am about to write. 
        optimisticResponse: {
          __typename: 'Mutation',
          addPet: {
            __typename: 'Pet',
            id: Math.floor(Math.random() * 1000) + '',
            name: input.name,
            type: input.type,
            img:  'https://via.placeholder.com/300'
          }

        }

      })
      
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}


// Mutation Query 
// mutation CreatePet($newPet: NewPetInput!){
//   addPet(input: $newPet){
//     id
//     name
//     type
//     img
//   }
// }

