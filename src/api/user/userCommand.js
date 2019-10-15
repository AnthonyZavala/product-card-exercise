// Create new user command
class Create {
    constructor(userId) {
        this.userId = userId;
    }
}

// Add favorite productId to user command
class AddFavorite {
    constructor(productId) {
        this.productId = productId;
    }
}

// Remove favorite productId from user command
class RemoveFavorite {
    constructor(productId) {
        this.productId = productId;
    }
}

module.exports = { Create, AddFavorite, RemoveFavorite };