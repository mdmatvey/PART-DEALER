import { observer } from 'mobx-react-lite'
import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../index'
import { Button, Row, Form, Container } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import Item from './Item'
import { fetchBrands, fetchCategories } from './http/productAPI'
import SkeletonItem from './skeleton_components/SkeletonItem'
import BootstrapReStyles from '../styles/BootstrapReStyles.css'
import EventStyles from '../styles/EventStyles.css'

const Categories = observer(({ purpose }) => {
  const { product, user } = useContext(Context)

  let purp = ''
  let path
  const [isLoading, setIsLoading] = useState(true)
  const [md, setMd] = useState(4)

  if (purpose === 'categories') {
    purp = 'категориям'
    path = product.categories
    useEffect(() => {
      fetchCategories()
        .then(data => {
          product.setCategories(data)
          setIsLoading(false)
        })
    }, [])
  } else if (purpose === 'brands') {
    purp = 'брендам'
    path = product.brands
    useEffect(() => {
      fetchBrands()
        .then(data => {
          product.setBrands(data)
          setIsLoading(false)
        })
    }, [])
  }

  useEffect(() => {
    if (user.userWidth < 992) {
      setMd(2)
    } else if (user.userWidth < 1200) {
      setMd(3)
    } else if (user.userWidth >= 1200) {
      setMd(4)
    }
  }, [user.userWidth])

  return (
        <Container className='pt-5 pb-5'>
            <Fade top>
              <div>
                <h1 className='mb-3'>
                    По {purp}:
                </h1>
                <Form
                  className="d-flex local-searchbar"
                >
                    <Form.Control
                        type="search"
                        placeholder={'Поиск по ' + purp}
                        className="me-2"
                        aria-label="Search"
                    />
                    <button
                      style={{ margin: 0 }}
                      className='main-button'
                      type='button'
                    >
                      Поиск
                    </button>
                </Form>
              </div>
            </Fade>
            <Fade bottom>
              <Row md={md}>
                  {
                      isLoading
                        ? <SkeletonItem items={8} />
                        : path.map(item =>
                              <Item key={item.key} path={item} purpose={purpose} />
                        )
                  }
              </Row>
            </Fade>
        </Container>
  )
})

export default Categories
