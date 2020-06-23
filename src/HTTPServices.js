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

    fetchAllWishlistBooks(callback) {
        fetch("http://localhost:8080/home/user/wishlist/getall/101")
        .then(res => res.json())
        .then(values => callback(values))
    }

    removeBookFromWishList(userId, bookId){
        fetch("http://localhost:8080/home/user/wishlist/remove", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({"bookId": bookId, "userId": userId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    removeBookFromCart(userId, bookId, quantity){
        fetch("http://localhost:8080/home/user/cart/remove", {
            method: 'PUT',
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity, "userId": userId})})
            .then(res => res.text())
            .then(res => console.log(res))
    }
    
    fetchAllBookAsc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-asc/price')
        .then(res => res.json())
        .then(values => callback(values))
     }

     fetchAllBookDesc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-desc/price')
        .then(res => res.json())
        .then(values => callback(values))
     }

     fetchAllSearchBook(searchText, callback) {
        console.log("text", searchText)
        fetch(`http://localhost:8080/verifyaccount/searchbooks/${searchText}`)
        .then(res => res.json())
        .then(values => callback(values))
    }

    signUpData(username, password, email, phoneNo, role) {
        fetch("http://localhost:8080/api/auth/signup", {
        method: 'POST',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({
            "email": email, 
            "password": password, 
            "phoneNumber": phoneNo,
            "role": role,
            "username": username
        })})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    signInData(username, password) {
        fetch("http://localhost:8080/api/auth/signin", {
        method: 'POST',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })})
        .then(res => res.json())
        .then(res => localStorage.setItem("token", res.accessToken))
    }

}

export default HTTPServices;