class HTTPServices{
    
    fetchgetAllBook(callback) {
        fetch('http://localhost:8080/verifyaccount/all')
        .then(res => res.json())
        .then(values => callback(values))
     }

     addToCart(userId, bookId, quantity) {
        fetch("http://localhost:8080/home/user/cart/add-update", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity, "userId": userId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    addToWishList(userId, bookId) {
        fetch("http://localhost:8080/home/user/wishlist/add", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({"bookId": bookId, "userId": userId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    fetchAllCartBook(callback) {
        fetch("http://localhost:8080/home/user/cart/getall/101")
        .then(res => res.json())
        .then(values => callback(values))
    }
}

export default HTTPServices;