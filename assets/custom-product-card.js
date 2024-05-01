class CustomProductCard extends HTMLElement {

  constructor() {
    super();

    this.productHandle = this.dataset.productHandle;
    console.log("product-handle", this.productHandle);
    this.sectionId = this.dataset.sectionId;
    if (this.querySelector("script")) {
      this.variantData = JSON.parse(this.querySelector("script").textContent);
    }
    this.addEventListener("change", this.onOptionChange);
  }

  onOptionChange() {
    console.log("clicked");

    this.selectedOptions = Array.from(
      this.querySelectorAll('input[type="radio"]:checked'),
      (input) => input.value
    );
    this.currentVariant = this.variantData.find(
      (item) =>
        JSON.stringify(item.options).includes(this.selectedOptions)
        // JSON.stringify(item.options) == JSON.stringify(this.selectedOptions)
    );
    console.log("variantdata", this.variantData);
    console.log("variantdata", this.variantData[0].options);
    console.log("current variant", this.currentVariant);
    console.log("selected variant", this.selectedOptions);
    this.getUpdatedCard();
  }

  getUpdatedCard() {
    // const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=custom-product-card`;
    const url = `/products/${this.productHandle}?view=card&variant=${this.currentVariant.id}`;
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        // this.innerHTML = html.querySelector(
        //   `[data-product-handle="${this.productHandle}"]`
        // ).innerHTML;
        this.innerHTML = html.querySelector("custom-product-card").innerHTML;
      });
  }

    // constructor() {
    //   super();
    //   this.addEventListener('change', event => {
    //     if(event.target.name == "id") this.variantChange();
    //   })
    //   this.addEventListener('click', event => {
    //     if(event.target.name == "add") this.addToBag();
    //   })
    // }
    // variantChange() {
      
    //   this.selectedVariantId = this.querySelector('[name="id"]').value;
    //   let variantUrl = `/products/${this.dataset.productHandle}?view=card&variant=${this.selectedVariantId}`;
       
    //   //Change the DOM Elements
    //   fetch(variantUrl)
    //     .then((response) => response.text())
    //     .then((responseText) => {
    //       const html = new DOMParser().parseFromString(responseText, 'text/html');
    //       const responseCard = html.querySelector('custom-product-card');

    //       console.log(html);
    //       this.innerHTML = responseCard.innerHTML;
    //     });
    // }
    // addToBag() {
    //   this.selectedVariantId = this.querySelector('[name="id"]').value;
  
    //   let formData = {
    //    'items': [{
    //     'id': this.selectedVariantId,
    //     'quantity': 1
    //     }]
    //   };
    //   fetch(window.Shopify.routes.root + 'cart/add.js', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(response => {
    //     //Replace the below line with ajax cart open and update code
    //     document.location.href = '/cart';
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // }
  }
  customElements.define('custom-product-card', CustomProductCard);
  
  