const { GetEvents, AddEvent } = require('./userEventStoreRepo');
const { User } = require('./user');
const { Create, AddFavorite, RemoveFavorite } = require('./userCommand');
const { Errored } = require('./userEvent');

// Project user state from events
exports.GetUser = (userId) => projectUser(userId);

// Project user favorites from events
exports.GetUserFavorites = (userId) => projectUser(userId).favorites;

// Execute create command for given userId
exports.CreateUser = (userId) => executeCommand(userId, new Create(userId));

// Execute add favorite command for given userId
exports.AddFavorite = (userId, productId) => executeCommand(userId, new AddFavorite(productId));

// Execute remove favorite command for given userId
exports.RemoveFavorite = (userId, productId) => executeCommand(userId, new RemoveFavorite(productId));

// Replay events for given userId and project current state 
const projectUser = (userId) => GetEvents(userId)
  .reduce((state, event) => User.Apply(event, state), User.Init());

// Execute given command for given userId on current projected state
const executeCommand = (userId, command) => {
  // Current user state
  const user = projectUser(userId);
  
  // Execute command and get event
  const resultingEvent = User.Execute(command, user);

  // If the resulting event is an error, do not store and return bad request.
  if (resultingEvent.constructor === Errored) {
    return resultingEvent;
  }

  // Add good events to the event store
  AddEvent(userId, resultingEvent);
  return;
}
