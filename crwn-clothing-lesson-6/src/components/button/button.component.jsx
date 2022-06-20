import './button.styles.scss'

export const Button = ({children, buttonType})=>{
    return <button className={`button-container ${buttonType}`}>{children}</button>
}