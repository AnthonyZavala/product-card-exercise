// In memory event store
let events = new Map();

// Get events for userId if they exist, else return empty array
exports.GetEvents = (userId) => events.has(userId) ? events.get(userId) : [];

// Add event to end of stream for userId
exports.AddEvent = (userId, event) => events.set(userId, (events.has(userId) ? events.get(userId) : []).concat([event]));
