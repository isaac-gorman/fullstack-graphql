import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'


const ALL_PETS = gql`
query AllPets {
  pets{
    name
    id
    img
    type
  }
}
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  // As and argument useQuery will take a GraphQL query
  const {data, loading, error} = useQuery(ALL_PETS)

  if(loading){
    return <Loader/>
  }

  if(error){
    return <p>error</p>
  }

  // const pets = data
  console.log('loading:', loading)
  console.log("data:", data)
  console.log("error:", error)

  const onSubmit = input => {
    setModal(false)
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
