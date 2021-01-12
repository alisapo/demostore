export const Favs = (e, product) => {
  e.preventDefault();
  
  let prod = {
    categoryId: product.categoryId,
    images: product.images,
    title: product.title,
    brand: product.brand,
    price: product.price
  };
  let serProd = JSON.stringify(prod);
  localStorage.setItem(product.id, serProd);
}
