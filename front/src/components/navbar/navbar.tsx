
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { AiTwotoneBank } from 'react-icons/ai'
import { IoMdMoon } from 'react-icons/io'
import { FaSun } from 'react-icons/fa'



const Navbar = () => {
    const [changeTheme, setChangeTheme] = useState<boolean>(false)
    const handleClick = (): void => {
        setChangeTheme(!changeTheme)
    }
    return (
        <div className='navbar-body'>

            <nav className="navbar">
                <AiTwotoneBank size={40}/>
                <ul className="ulbar">
                    <li className='lista'><Link to='/'>Inicio</Link></li>
                    <li className='lista'><Link to='/Calculadora'>Calculadora</Link></li>
                    <li className='lista'><Link to='/todo'>Tarefas</Link></li>
                    <li><button id='change-theme' onClick={handleClick}>
                            {changeTheme ? (<IoMdMoon size={30} color='black' />) : (<FaSun size={30} color='orange' />)}
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}
export default Navbar