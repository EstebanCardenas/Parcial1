url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
selected = []

const burger_info = document.getElementById("burgers")
const c_product = document.getElementById("c_product")

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
                    let content = `<div class="card">
                    <img src="${o["image"]}" class="card-img-top" alt="${o["name"]}">
                    <div class="card-body">
                      <h5 class="card-title">${o["name"]}</h5>
                      <p class="card-text">${o["description"]}</p>
                      <p class="card-text">$${o["price"]}</p>
                      <button class="btn btn-dark">Add to cart</button>
                    </div>
                  </div>`
                  burger_info.innerHTML += content
                }
            }
        }
    })
}

displayProducts("Burguers", "Burgers")

//add event listeners
Array.from(document.getElementById("options").children).forEach((el) => {
    el.addEventListener("click", () => {
        displayProducts(el.id, el.textContent)
    })
})