// New user created event
class Created {
    constructor(userId) {
        this.userId = userId;
    }
}

// Favorite productId added to user event
class FavoriteAdded {
    constructor(productId) {
        this.productId = productId;
    }
}

// Favorite productId removed from user event
class FavoriteRemoved {
    constructor(productId) {
        this.productId = productId;
    }
}

// Command could not be applied to user event
// This event does not need to be applied to a user state
class Errored {
    constructor(command, state) {
        this.command = command;
        this.state = state;
    }
}

module.exports = { Created, FavoriteAdded, FavoriteRemoved, Errored };