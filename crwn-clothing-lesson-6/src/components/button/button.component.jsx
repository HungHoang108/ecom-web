import './button.styles.scss'

export const Button = ({children, buttonType, ...otherProps})=>{
    return <button className={`button-container ${buttonType}`} {...otherProps}>{children}</button>
}