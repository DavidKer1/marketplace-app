import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import Loading from '../../components/Loading'
import { FirebaseContext } from '../../context/firebase/FirebaseContext'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
  const {user} = useContext(FirebaseContext)
  
  if(user === null) return <Loading isVisible={true} text={'Cargando...'} />
  return (
      user ? <UserLogged /> : <UserGuest />
  )
}
