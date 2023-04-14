if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}
else ready()

// Some global variables
const hiddenImages = document.getElementsByClassName('hidden_image')

const map = {
  Red: document.getElementsByClassName('product_image_main')[0].src,
  Ice: hiddenImages[0].src,
  Beige: hiddenImages[1].src,
  Iron: document.getElementsByClassName('product_image_main')[1].src,
  Rust: hiddenImages[2].src,
  Biscuit: hiddenImages[3].src
}
// end of global variables

function ready () {
  var removeCartItemButtons = document.getElementsByClassName('item_remove_button')

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('item_quantity')
  for (var i = 0; i < quantityInputs.length; i++) {
    var quantityInput = quantityInputs[i]
    quantityInput.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('add_to_cart_button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  var buyNowButton = document.getElementsByClassName('buy_now')[0].addEventListener('click', buyNowClicked)

  var productColorButtons = document.getElementsByClassName('product_colors')
  for (var i = 0; i < productColorButtons.length; i++) {
    var colorButton = productColorButtons[i]
    colorButton.addEventListener('click', changeItemColor)
  }

}

function changeItemColor (event) {
  var itemColorButton = event.target
  var itemColorButtons = itemColorButton.parentElement
  var buttons = itemColorButtons.getElementsByClassName('product_color_button')

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i]

    button.style.background='none'
    button.style.color='black'
  }

  document.getElementsByClassName('product_image_main')[0].src

  itemColorButton.style.background='#585858'
  itemColorButton.style.color='white'

  if (itemColorButton.innerText == 'Red' || itemColorButton.innerText == 'Ice' || itemColorButton.innerText == 'Beige') {
    document.getElementsByClassName('product_image_main')[0].src = map[itemColorButton.innerText]
  }
  else {
    document.getElementsByClassName('product_image_main')[1].src = map[itemColorButton.innerText]
  }
}

function buyNowClicked () {
  alert("Thank You or your Purchase :)")
  var cartItems = document.getElementsByClassName('cart_container')[0]

  while (cartItems.hasChildNodes()) cartItems.removeChild(cartItems.firstChild)
  updateCartTotal()
}

function addToCartClicked (event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('product_title')[0].innerText
  var price = shopItem.getElementsByClassName('product_price')[0].innerText
  var imageSource = shopItem.getElementsByClassName('product_image_main')[0].src

  addItemToCart(title, price, imageSource)
  updateCartTotal()
}

function addItemToCart(title, price, imageSource) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart_row')
  var cartItems = document.getElementsByClassName('cart_container')[0]
  var cartItemNames = cartItems.getElementsByClassName('item_name')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item already in cart")
      return
    }
  }
  var cartRowContents = `
  <div class="cart_item_column">
    <img src="${imageSource}">
    <p class="item_name">${title}</p>
  </div>
  <div class="cart_price_column">
    <p id="item_price">${price}</p>
  </div>
  <div class="cart_quantity_column">
    <input class="item_quantity" type="number" value="1">
    <button class="item_remove_button">Remove</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('item_remove_button')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('item_quantity')[0].addEventListener('change', quantityChanged)
}

function quantityChanged (event) {
  var quantityInput = event.target
  if (isNaN(quantityInput.value) || quantityInput.value<= 0)
    quantityInput.value = 1
  updateCartTotal()
}

function removeCartItem () {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function updateCartTotal () {
  var cartItemContainer = document.getElementsByClassName('cart_container')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart_row')
  var total = 0

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart_price_column')[0]
    var quantityElement = cartRow.getElementsByClassName('cart_quantity_column')[0]

    var price = priceElement.innerText.replace('₹ ', '')
    var quantity = quantityElement.querySelector('input').value
    total += (price * quantity)
  }

  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart_total_price')[0].querySelector('p').innerText = '₹ ' + total
}
