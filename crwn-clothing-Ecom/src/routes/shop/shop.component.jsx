
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import { CategoryRoute } from '../category/category.route'
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'
import './shop.styles.scss'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect (()=>{
        const getCategoriesMap = async ()=>{
            const categoriesArray = await getCategoriesAndDocument('categories')
           
            dispatch(setCategories(categoriesArray))
        }
        getCategoriesMap()
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<CategoryRoute/>}/>
        </Routes>
        

    )
}

export default Shop;