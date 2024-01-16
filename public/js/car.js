console.log("im cars cars");

window.onload = async () => {
  getProducts();
  showProducts()
};

async function getProducts() {
  const httpRes = await fetch(`/hot-picks`);
  const resp = await httpRes.json();
  console.log("resp", resp);
  return resp;
}

async function showProducts(){
    let result = await getProducts();
    console.log("showproducts",result)
    let indexProduct = "";


    for (let entry of result){

        indexProduct += `<div class="col-md-3 head-4">
        <div class="wsk-cp-product">
          <div class="wsk-cp-img">
            <img
              src="${entry.image}"
              height="360px"
              alt="Product"
              class="img-responsive"
            />
          </div>
          <div class="wsk-cp-text">
            <div class="category">
              <span>${entry.brand_model}</span>
            </div>
            <div class="title-product">
              <h3>${entry.seats} - ${entry.transmission}</h3>
            </div>
            <div class="description-prod">
              <p>${entry.description}</p>
            </div>
            <div class="card-footer">
              <div class="wcf-left">
                <span class="price">${entry.rent_price}/天</span>
              </div>
              <div class="wcf-right">
                <a href="tripplan.html" class="buy-btn"
                  ><i class="zmdi zmdi-shopping-basket"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
    document.querySelector(".cars-area1").innerHTML = indexProduct
}
