import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { Fragment } from "react/cjs/react.development";
import './category.styles.scss'


export const CategoryRoute = () => {
    let { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])
   

  return (

    <Fragment>
    <h2 className="category-title">{category.toUpperCase()}</h2>
    <div className="category-container">
        
        {products && products.map(product => {
            return (<ProductCard key={product.id} product={product}/>)
        }
            
        )}
    </div>
    </Fragment>
  )
}


