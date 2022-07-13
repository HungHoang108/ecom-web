import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import { CategoryRoute } from '../category/category.route'
import './shop.styles.scss'

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<CategoryRoute/>}/>
        </Routes>
        

    )
}

export default Shop;