const { Created, FavoriteAdded, FavoriteRemoved, Errored } = require('./userEvent');
const { Create, AddFavorite, RemoveFavorite } = require('./userCommand');

// Ephemeral state holder for event sourced user.
class User {
    constructor(id, favorites) {
        this.id = id;
        this.favorites = favorites;
    }

    // Default user state initializer
    static Init() {
        return new User(null, []);
    }

    // Given some state, when an event is applied, return a new state
    static Apply(event, state) {
        if (!event) return state;
        switch (event.constructor) {
            case Created:
                return new User(event.userId, state.favorites);
            case FavoriteAdded:
                return new User(state.id, state.favorites.concat([event.productId]));
            case FavoriteRemoved:
                return new User(state.id, state.favorites.filter(favoriteProductId => favoriteProductId !== event.productId));
            default:
                return state;
        }
    }

    // Given some state, when a command is executed, return an event
    static Execute(command, state) {
        switch (command.constructor) {
            case Create: // Check if id already exists
                if (state.id === null) {
                    return new Created(command.userId);
                }
                break;
            case AddFavorite: // Check if favorite to be added already exists
                if (state.id !== null && !state.favorites.some(favoriteProductId => favoriteProductId === command.productId)) {
                    return new FavoriteAdded(command.productId);
                }
                break;
            case RemoveFavorite: // Check if favorite to be removed does not exist
                if (state.id !== null && state.favorites.some(favoriteProductId => favoriteProductId === command.productId)) {
                    return new FavoriteRemoved(command.productId);
                }
                break;
            default:
            // Handled by final return
        }

        // Return errored event is command cannot be executed
        return new Errored(command, state);
    }
}

module.exports = { User };