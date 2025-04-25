
import {Link} from  'react-router-dom'
import './navbar.css'


const Navbar = ()=>{
    return(
        <nav className="navbar">
            <ul className="ulbar">
                <li><Link to='/'>inicio</Link></li>
                <li><Link to='/Calculadora'>Calculadora</Link></li>
                <li><Link to='/todo'> a fazeres</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar