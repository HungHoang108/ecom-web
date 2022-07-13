import ProductCard from '../product-card/product-card.component';
import {Link} from "react-router-dom";

// import {useNavigate} from 'react-router-dom'
import './category-preview.styles.scss'

const CategoryPreview = ({title, products}) => {
    
    // Another way to create nested routes inside shop and category preview route*
    // const navigateItem = useNavigate()
    // const ItemRoute = ()=>{
    //     navigateItem(`/shop/${title}`)
    // }

    return (
        <div className='category-preview-container'>
            <h2 >  
                <Link to={title} className='title'>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {
                    products
                    .filter((_, index) => index < 4)
                    .map(product => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;