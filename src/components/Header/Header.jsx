import React from 'react';
import Container from '../container/Container';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        },
    ];

    return (
        <header className='py-4 shadow-md bg-white text-gray-800'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Link to='/'>
                            <Logo width='70px' size="text-3xl"/>
                        </Link>
                    </div>

                    <ul className='flex items-center space-x-4 ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <Link
                                        to={item.slug}
                                        className='text-gray-600 hover:text-blue-600 transition-colors duration-300'
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ) : null
                        )}
                        {!authStatus && (
                            <>
                                <li>
                                    <Link
                                        to='/login'
                                        className='py-2 px-4 rounded-full transition-colors duration-300'
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/signup'
                                        className='py-2 px-4 rounded-full transition-colors duration-300'
                                    >
                                        Signup
                                    </Link>
                                </li>
                            </>
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;