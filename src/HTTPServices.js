class HTTPServices {

    fetchgetAllBook(callback) {
        fetch('http://localhost:8080/verifyaccount/all')
            .then(res => res.json())
            .then(values => callback(values))
            .catch(() => callback([]))
    }

    addToCart(bookId, quantity) {
        return fetch("http://localhost:8080/home/user/cart/add-update", {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ bookId, bookQuantity: quantity })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    addToWishList(userId, bookId) {
        return fetch("http://localhost:8080/home/user/wishlist/add", {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ bookId, userId })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    fetchAllCartBook(callback) {
        fetch("http://localhost:8080/home/user/cart/getall", {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (!res.ok) return [];
                return res.json();
            })
            .then(values => callback(values))
            .catch(() => callback([]))
    }

    fetchAllWishlistBooks(callback) {
        fetch("http://localhost:8080/home/user/wishlist/getall", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (!res.ok) return [];
                return res.json();
            })
            .then(values => callback(values))
            .catch(() => callback([]))
    }

    removeBookFromWishList(userId, bookId) {
        return fetch("http://localhost:8080/home/user/wishlist/remove", {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ bookId, userId })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    removeBookFromCart(bookId, quantity) {
        return fetch("http://localhost:8080/home/user/cart/remove", {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ bookId, bookQuantity: quantity })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    fetchAllBookAsc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-asc/price')
            .then(res => res.json())
            .then(values => callback(values))
            .catch(() => callback({ content: [] }))
    }

    fetchAllBookDesc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-desc/price')
            .then(res => res.json())
            .then(values => callback(values))
            .catch(() => callback({ content: [] }))
    }

    fetchAllSearchBook(searchText, callback) {
        fetch(`http://localhost:8080/verifyaccount/searchbooks/${searchText}`)
            .then(res => res.json())
            .then(values => callback(values))
            .catch(() => callback([]))
    }

    signUpData(username, password, email, phoneNo, role) {
        return fetch("http://localhost:8080/api/auth/signup", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                phoneNumber: phoneNo,
                role,
                username
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Signup failed');
                return res.text();
            })
    }

    signInData(username, password) {
        return fetch("http://localhost:8080/api/auth/signin", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.accessToken) {
                    localStorage.setItem("token", res.accessToken)
                    localStorage.setItem("role", JSON.stringify(res.role || []))
                }
                return res;
            })
    }

    isAdmin() {
        try {
            const role = JSON.parse(localStorage.getItem("role") || "[]");
            return role.includes("admin");
        } catch (e) {
            return false;
        }
    }

    adminAddBook(bookData) {
        return fetch("http://localhost:8080/admin/book/add", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(bookData)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add book');
                return res.json();
            })
    }

    adminDeleteBook(bookId) {
        return fetch(`http://localhost:8080/admin/book/delete/${bookId}`, {
            method: 'DELETE',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete book');
                return res.json();
            })
    }

    forgotPasswordMail(email) {
        return fetch("http://localhost:8080/api/auth/forgotpassword", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    addCustomerDetails(name, pincode, locality, address, city, landmark, addressType) {
        return fetch("http://localhost:8080/home/customer/adddetails", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ name, pincode, locality, address, city, landmark, addressType })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }

    OrderId(callback) {
        fetch('http://localhost:8080/home/user/cart/orderplaced/orderid', {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.text())
            .then(values => callback(values))
            .catch(() => callback(''))
    }

    placeOrder(callback) {
        fetch('http://localhost:8080/home/user/cart/orderplaced/orderid', {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.text())
            .then(values => callback(values))
            .catch(() => callback(''))
    }

    isCustomerDetailsExisted(callback) {
        fetch("http://localhost:8080/home/customer/isexisted", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.text())
            .then(res => callback(res))
            .catch(() => callback('false'))
    }

    resetPassword(password) {
        return fetch("http://localhost:8080/api/auth/resetpassword", {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ password })
        })
            .then(res => res.text())
            .catch(err => console.log(err))
    }
}

export default HTTPServices;
