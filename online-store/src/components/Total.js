import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { Context } from '..'
import { setEnding } from '../utils/functions'
import { SECONDARY_COLOR } from '../utils/uiConsts'

const Total = observer(({ itemsCount }) => {
  const { cart } = useContext(Context)

  const ending = setEnding(itemsCount)

  return (
        <Card
            style={{ background: SECONDARY_COLOR, color: '#fff', width: '100%', padding: '20px 10px', border: 'none' }}
        >
            <div className="d-inline-flex justify-content-between align-items-baseline">
                <span
                    style={{ fontWeight: 500, fontSize: '2rem' }}
                >
                    Итого:
                    {
                       cart.cartItems.length === 0 ? null : <strong>{' ' + cart.cartItems.map(item => item.price * item.count).reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2) + '₽'}</strong>
                    }
                </span>
            </div>
            <span style={{ fontSize: '1.5rem' }}>Всего: {itemsCount} товар{ending}</span>
        </Card>
  )
})

export default Total
