import { menuArray } from '/data.js'

const orderContainer = document.getElementById('order-container')
const totalPrice = document.getElementById('total-price')
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentForm = document.getElementById('payment-form')

let totalOrder = 0
let completedOrderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        renderOrderHtml(e.target.dataset.add)
        document.getElementById('checkout-container').style.display = "inline"
    } else if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
        if (completedOrderArray.length < 1){
            document.getElementById('checkout-container').style.display = "none"
            document.getElementById('order-confirmation-msg').style.display = "none"
        }
    }
})

completeOrderBtn.addEventListener('click', function(){
    document.getElementById('modal').style.display = "inline"
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('modal').style.display = "none"
    document.getElementById('checkout-container').style.display = "none"
    
    const nameInput = document.getElementById('name-input')
    const orderConfirmationMsg = document.getElementById('order-confirmation-msg')
    orderConfirmationMsg.style.display = "block"
    
    orderConfirmationMsg.innerHTML = `
                                    <p>Thanks, ${nameInput.value}! Your order is on its way!</p>
    `
    nameInput.value = ''
    document.getElementById('card-num-input').value = ''
    document.getElementById('cvv-input').value = ''
    orderContainer.textContent = ``
    completedOrderArray = []
    totalOrder = 0
})

function getHtml(){
    let feedHtml = ''
    
    menuArray.forEach(function(menu){
        feedHtml += `
                <div id="menu-container" class="menu-container">
                    <div class="menu-main">
                        <div class="menu-img">
                            <p>${menu.emoji}</p>
                        </div>
                        <div class="menu-description">
                            <h3>${menu.name}</h3>
                            <p>${menu.ingredients}</p>
                            <h4>$${menu.price}</h4>
                        </div>
                    </div>
                    <button class="add-btn" id="add-btn" data-add="${menu.id}">+</button>
                </div>
        `
    })
    return feedHtml
}

function render(){
    document.getElementById('container').innerHTML = getHtml()
}

render()

function renderOrderHtml(orderId){
    let orderHtml = ``
    let orderObj = {}   
    for (let menu of menuArray){
        if (menu.id == orderId){
            orderHtml = `
                <div class="order-line-container">
                    <div class="order-details">
                        <h4 id="order-name">${menu.name}</h4>
                        <button class="remove-btn" id="remove-btn" data-remove="${menu.id}">remove</button>
                    </div>
                    <div class="item-price-container">
                        <h4 id="order-price">$${menu.price}</h4>
                    </div>
                </div>
            `
            orderObj = {id: menu.id,
                        price: menu.price,
                        details: orderHtml}
            completedOrderArray.push(orderObj)
            totalOrder += menu.price
            totalPrice.textContent = '$' + totalOrder
        }
    }
    orderContainer.innerHTML += orderHtml
}

function removeOrder(orderId){
    removeItemArray(completedOrderArray, orderId)
    displayFinalOrder()
}

function removeItemArray(array, index){
    for (let i = 0; i < array.length; i++){
        if (array[i].id == index){
            totalOrder -= array[i].price
            const removedItem = array.splice(i, 1)
        }
    }
    return array
}

function displayFinalOrder(){
    orderContainer.innerHTML = ``
    for (let order of completedOrderArray){
        orderContainer.innerHTML += order.details
    }
    totalPrice.textContent = '$' + totalOrder
}

