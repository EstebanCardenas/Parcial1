url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
let selected = {}
t_items = 0

const burger_info = document.getElementById("burgers")
const c_product = document.getElementById("c_product")
const n_items = document.getElementById("n_items")
const cart = document.getElementById("cart")

function checkout() {
    c_product.innerHTML = "<h2>Order detail</h2>"
    burger_info.innerHTML = ""
    burger_info.className = ""
    let table = document.createElement("table")
    table.className = "table table-striped"
    table.id = "order_table"
    table.innerHTML = "<thead>\
        <tr>\
            <th>Item</th><th>Qty.</th><th>Description</th><th>Unit Price</th><th>Amount</th>\
        </tr>\
    </thead>"
    let tBody = document.createElement("tbody")
    let i = 1
    let total = 0
    for (let key of Object.keys(selected)) {
        let detail = selected[key]
        total += detail.amount
        tBody.innerHTML += `<tr>
            <td>${i}</td><td>${detail["qty"]}</td><td>${key}</td><td>${detail["price"]}</td><td>${Math.round(detail.amount*100)/100}</td>
        </tr>`
        i++
    }
    table.appendChild(tBody)
    let f_div = document.createElement("div")
    f_div.className = "d-flex justify-content-between"
    f_div.innerHTML = `<div id="total"><b>Total: $${Math.round(total*100)/100}</b></div>`
    let but_div = document.createElement("div")
    but_div.innerHTML = `<button type="button" class="btn cancel" data-toggle="modal" data-target="#exampleModal">
        Cancel
    </button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cancel the order</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure about cancelling the order?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn confirm" data-dismiss="modal" id="confirm_cancel">Yes, I want to cancel the order</button>
                    <button type="button" class="btn cancel" data-dismiss="modal">No, I want to continue adding products</button>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="btn confirm" id="confirm">Confirm order</button>`
    f_div.appendChild(but_div)
    burger_info.appendChild(table)
    burger_info.appendChild(f_div)
    //add event listeners
    document.getElementById("confirm_cancel").addEventListener("click", () => {
        table.tBodies[0].innerHTML = ""
        selected = {}
        t_items = 0
        n_items.innerHTML = ""
        document.getElementById("total").innerHTML = "<b>Total: $0</b>"
    })
    document.getElementById("confirm").addEventListener("click", () => {
        console.log(selected)
        table.tBodies[0].innerHTML = ""
        selected = {}
        t_items = 0
        n_items.innerHTML = ""
        document.getElementById("total").innerHTML = "<b>Total: $0</b>"
    })
}

function addToCart(name, price) {
    t_items++
    t_items == 1 ? n_items.innerHTML = `${t_items} item` : n_items.innerHTML = `${t_items} items`
    if (selected[name] != undefined) {
        selected[name]["qty"] += 1
    } else {
        selected[name] = {
            qty: 1,
            price: price,
            get amount() {return this.qty*this.price}
        }
    }
}

function displayProducts(name, r_name) {
    fetch(url).then((res) => 
        res.json()
    )
    .then((json) => {
        burger_info.innerHTML = ""
        for (let pType of json) {
            if (pType["name"] == name) {
                c_product.innerHTML = `<h2>${r_name}</h2>`
                let products = pType["products"]
                for (let o of products) {
                    let content = document.createElement("div")
                    content.className = "card"
                    content.innerHTML += `<img src="${o["image"]}" class="card-img-top" alt="${o["name"]}">`
                    let body = document.createElement("div")
                    body.className = "card-body"
                    body.innerHTML += `<h5 class="card-title">${o["name"]}</h5>
                    <p class="card-text">${o["description"]}</p>
                    <p class="card-text">$${o["price"]}</p>`
                    let button = document.createElement("button")
                    button.className = "btn btn-dark"
                    button.innerText = "Add to cart"
                    button.addEventListener("click", () => {
                        addToCart(o["name"], o["price"])
                    })
                    body.appendChild(button)
                    content.appendChild(body)
                    burger_info.appendChild(content)
                }
            }
        }
    })
}

displayProducts("Burguers", "Burgers")

//add event listeners
Array.from(document.getElementById("options").children).forEach((el) => {
    el.addEventListener("click", () => {
        burger_info.className = "card-group"
        displayProducts(el.id, el.textContent)
    })
})

cart.addEventListener("click", () => {
    checkout()
})