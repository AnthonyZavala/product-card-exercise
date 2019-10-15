const { Created, FavoriteAdded, FavoriteRemoved } = require('./userEvent');
const { User } = require('./user');

describe('User Event Tests', () => {
    const userId = Date.now().toString();

    it('Given initial user, when created event, then created user', () => {
        // Given
        const initialState = User.Init();

        // When
        const event = new Created(userId);
        const actualState = User.Apply(event, initialState);

        // Then
        const expectedState = new User(userId, []);
        expect(actualState).toEqual(expectedState);
    });

    it('Given existing user with no favorites, when favorite added event, then user has favorite', () => {
        // Given
        const favoriteId = Date.now().toString();
        const initialState = new User(userId, []);

        // When
        const event = new FavoriteAdded(favoriteId);
        const actualState = User.Apply(event, initialState);

        // Then
        const expectedState = new User(userId, [favoriteId]);
        expect(actualState).toEqual(expectedState);
    });

    it('Given existing user with existing favorite, when favorite removed event, then user has no favorites', () => {
        // Given
        const favoriteId = Date.now().toString();
        const initialState = new User(userId, [favoriteId]);

        // When
        const event = new FavoriteRemoved(favoriteId);
        const actualState = User.Apply(event, initialState);

        // Then
        const expectedState = new User(userId, []);
        expect(actualState).toEqual(expectedState);
    });
});