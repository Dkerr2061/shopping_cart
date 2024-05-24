import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number,
  quantity: number
}

export function CartItem({id, quantity}: CartItemProps){
  const {removeFromCart} = useShoppingCart()
  const items = storeItems.find(i => i.id === id)
  if(items == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={items.imgUrl} alt={items.name} style={{width: "125px", height: "75px", objectFit: "cover"}}/>
      <div className="me-auto">
        <div>
          {items.name}{" "}{quantity > 1 && <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span>}
        </div>
        <div className="text-muted" style={{fontSize: ".75rem"}}>
          {formatCurrency(items.price)}
        </div>
      </div>
      <div>{formatCurrency(items.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(items.id)}>&times;</Button>
    </Stack>
  )
}