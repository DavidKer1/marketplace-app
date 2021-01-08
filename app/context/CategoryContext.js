import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

export default function CategoryProvider({children}){
  const [category, setCategory] = useState({})
  const clearCategory = () => {
    setCategory({})
  }
  return(
    <CategoryContext.Provider value={{category, setCategory, clearCategory}}>{children}</CategoryContext.Provider>
  )
}