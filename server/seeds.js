var routinesSeeds = [
  {
    "userId": "1234567890",
    "type": "daily",
    "name": "Ate Popcorn",
    "days": [new Date(2015,01,02), new Date(2015,01,03)]
  }, {
    "userId": "1234567890",
    "type": "occasional",
    "name": "Sick",
    "days": [new Date(2015,01,04), new Date(2015,01,05)]
  }, {
    "userId": "987654321",
    "type": "occasional",
    "name": "Sick",
    "days": [new Date(2015,01,06), new Date(2015,01,07)]
  }
];

var guestSeeds = [
  {
    "_id": "1234567890",
    "createdAt": new Date()
  }, {
    "_id": "987654321",
    "createdAt": new Date()
  }
];

Meteor.startup( function() {
  if (Routines.find().count() === 0) {
    console.log('Seeds Generated');
    //Grant data
    routinesSeeds.forEach(function (seed) {
      Routines.insert(seed);
    });
    //Create main collections
    guestSeeds.forEach(function (seed) {
      Guests.upsert({ '_id': seed._id }, seed);
    });
  }
});
