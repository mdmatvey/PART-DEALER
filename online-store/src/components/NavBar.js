import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../index'
import { MAIN_ROUTE, ADMIN_ROUTE, USER_ROUTE, LOGIN_ROUTE, CART_ROUTE, SHOP_ROUTE } from '../utils/routeConsts'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { PRIMARY_COLOR, SECONDARY_COLOR, NAVLINK_STYLE, NAVBUTTON_STYLE } from '../utils/uiConsts'
import CartList from './CartList'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { FaTelegram, FaWhatsapp, FaRegUser } from 'react-icons/fa'
import { TbShoppingCart } from 'react-icons/tb'
import { GoSearch } from 'react-icons/go'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import '../styles/BootstrapReStyles.css'
import '../styles/NavbarStyles.css'
import '../styles/EventStyles.css'

const NavBar = observer(() => {
  const { user, cart } = useContext(Context)
  const navigate = useNavigate()

  const [cartOpen, setCartOpen] = useState(false)

  const [query, setQuery] = useState('')

  const searchAPI = searchQuery => {
    window.scrollTo(0, 0)
    navigate(SHOP_ROUTE, {
      state: {
        searchQuery
      }
    })
    setQuery('')
  }

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token') // temporarily
  }

  useEffect(() => {
    if (user.userWidth < 992) {
      setCartOpen(false)
    }
  }, [user.userWidth, user.isAuth])

  return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="d-flex flex-column"
                style={{ padding: 0, zIndex: 11 }}
            >
                <Container
                    className='navbar-container'
                    style={{ background: PRIMARY_COLOR, height: 30 }}
                    id='navbar-top-container'
                    fluid
                >
                    <Navbar.Brand
                        onClick={() => {
                          window.scrollTo(0, 0)
                          navigate(MAIN_ROUTE)
                        }}
                        id='nav-logo'
                        style={{ cursor: 'pointer', fontFamily: 'Amaranth, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '.05rem', padding: 0 }}
                    >
                        PART DEALER
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Button
                                style={NAVLINK_STYLE}
                            >
                                <span className='d-flex align-items-center navbar-contact'><FaTelegram />&nbsp;contact</span>
                            </Button>
                            <Button
                                style={NAVLINK_STYLE}
                            >
                                <span className='d-flex align-items-center navbar-contact'><FaWhatsapp />&nbsp;contact</span>
                            </Button>
                            <Button
                                style={NAVLINK_STYLE}
                            >
                                <span className='d-flex align-items-center navbar-contact'><BsTelephoneFill />&nbsp;contact</span>
                            </Button>
                            <Button
                                style={NAVLINK_STYLE}
                            >
                                <span className='d-flex align-items-center navbar-contact'><MdOutlineMailOutline />&nbsp;contact</span>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar
                sticky="top"
                bg="light"
                expand="lg"
                collapseOnSelect
                className="d-flex flex-column"
                style={{ top: -1, padding: 0, margin: 0, zIndex: 10 }}
            >
                <Container
                    className='navbar-container'
                    style={{ background: SECONDARY_COLOR, height: 60 }}
                    fluid
                >
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Form className="d-flex align-items-center">
                            <Form.Control
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{ border: '3px solid #fff' }}
                                type="search"
                                placeholder="Артикул"
                                className="me-2 search-bar"
                                id='nav-search-bar'
                                aria-label="Search"
                        />
                            <button
                                onClick={() => searchAPI(query)}
                                className='main-button inverted'
                                type='button'
                            >
                                <span className='d-flex align-items-center'><GoSearch />&nbsp;Искать</span>
                            </button>
                        </Form>
                        {user.isAuth
                          ? <Nav
                                className="ms-auto my-2 my-lg-0"
                                navbarScroll
                            >
                                {
                                    user.userWidth < 992
                                      ? <Nav.Link
                                        as={Link}
                                        to={CART_ROUTE}
                                        href={CART_ROUTE}
                                        className={`d-flex align-items-center ms-2 me-2 ${cartOpen && 'open'} nav-button`}
                                        style={NAVBUTTON_STYLE}
                                        onClick={() => {
                                          window.scrollTo(0, 0)
                                          navigate(CART_ROUTE)
                                        }}
                                    >
                                        <span className='d-flex align-items-center ps-2 pe-1'><TbShoppingCart style={{ fontSize: '1.5rem' }} />&nbsp;Корзина</span>
                                    </Nav.Link>
                                      : <Nav.Link
                                        className={`d-flex align-items-center ms-2 me-2 ${cartOpen && 'open'} nav-button`}
                                        style={NAVBUTTON_STYLE}
                                        onClick={() => setCartOpen(!cartOpen)}
                                    >
                                        <span className='d-flex align-items-center ps-2 pe-1'><TbShoppingCart style={{ fontSize: '1.5rem' }} />&nbsp;Корзина</span>
                                    </Nav.Link>
                                }
                                <div style={{ position: 'absolute', top: cartOpen ? 58 : -430, transition: '1s', right: 0, width: 600, height: 400, borderRadius: '0 0 5px 5px', background: SECONDARY_COLOR, zIndex: -1, boxShadow: cartOpen ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none' }}>
                                    <CartList cartPage={false} />
                                    <button
                                        onClick={() => {
                                          setCartOpen(false)
                                          window.scrollTo(0, 0)
                                          navigate(cart.cartItems.length ? CART_ROUTE : SHOP_ROUTE)
                                        }}
                                        style={{ display: 'block', margin: '20px auto 0 auto' }}
                                        className='main-button inverted'
                                    >
                                        Перейти в {cart.cartItems.length !== 0 ? 'корзину' : 'каталог'}
                                    </button>
                                </div>
                                <Nav.Link
                                    as={Link}
                                    to={USER_ROUTE}
                                    href={USER_ROUTE}
                                    style={NAVBUTTON_STYLE}
                                    className='d-flex align-items-center ms-2 me-2 nav-button'
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <span className='d-flex align-items-center ps-2 pe-1'><FaRegUser />&nbsp;Личный кабинет</span>
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to={ADMIN_ROUTE}
                                    href={ADMIN_ROUTE}
                                    style={NAVBUTTON_STYLE}
                                    className='d-flex align-items-center ms-2 me-2 nav-button'
                                    onClick={() => window.scrollTo(0, 0)}
                                    >
                                    <span className='d-flex align-items-center ps-2 pe-1'><FaRegUser />&nbsp;Админ-панель</span>
                                </Nav.Link>
                                <Nav.Link
                                    style={NAVBUTTON_STYLE}
                                    className='d-flex align-items-center nav-button'
                                    onClick={() => logOut()}
                                >
                                    <span className='d-flex align-items-center ps-2 pe-1'><BiLogOut style={{ fontSize: '1.5rem', rotate: '180deg' }} /></span>
                                </Nav.Link>
                            </Nav>
                          : <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link
                                    as={Link}
                                    to={LOGIN_ROUTE}
                                    href={LOGIN_ROUTE}
                                    style={NAVBUTTON_STYLE}
                                    className='d-flex align-items-center ms-2 me-2 nav-button'
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <span className='d-flex align-items-center ps-2 pe-1'><BiLogIn style={{ fontSize: '1.5rem' }} />&nbsp;Войти</span>
                                </Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
  )
})

export default NavBar
