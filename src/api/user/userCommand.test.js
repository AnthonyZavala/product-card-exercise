const { Create, AddFavorite, RemoveFavorite } = require('./userCommand');
const { Created, FavoriteAdded, FavoriteRemoved, Errored } = require('./userEvent');
const { User } = require('./user');

describe('User Command Tests', () => {
    const userId = Date.now().toString();

    it('Given initial user, when create command, then created event', () => {
        // Given
        const initialState = User.Init();

        // When
        const command = new Create(userId);
        const actualEvent = User.Execute(command, initialState);

        // Then
        const expectedEvent = new Created(userId);
        expect(actualEvent).toEqual(expectedEvent);
    });

    it('Given existing user with no favorites, when add favorite command, then favorite added event', () => {
        // Given
        const favoriteId = Date.now().toString();
        const initialState = new User(userId, []);

        // When
        const command = new AddFavorite(favoriteId);
        const actualEvent = User.Execute(command, initialState);

        // Then
        const expectedEvent = new FavoriteAdded(favoriteId);
        expect(actualEvent).toEqual(expectedEvent);
    });

    it('Given existing user with existing favorite, when remove favorite command, then favorite removed event', () => {
        // Given
        const favoriteId = Date.now().toString();
        const initialState = new User(userId, [favoriteId]);

        // When
        const command = new RemoveFavorite(favoriteId);
        const actualEvent = User.Execute(command, initialState);

        // Then
        const expectedEvent = new FavoriteRemoved(favoriteId);
        expect(actualEvent).toEqual(expectedEvent);
    });

    it('Given existing user with existing favorite, when add favorite command for existing favorite, then errored event', () => {
        // Given
        const favoriteId = Date.now().toString();
        const initialState = new User(userId, [favoriteId]);

        // When
        const command = new AddFavorite(favoriteId);
        const actualEvent = User.Execute(command, initialState);

        // Then
        const expectedEvent = new Errored(command, initialState);
        expect(actualEvent).toEqual(expectedEvent);
    });
});