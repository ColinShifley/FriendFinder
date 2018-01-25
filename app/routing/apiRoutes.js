var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });

    
        app.post("/api/friends", function(req, res) {
            var bestMatch = {
                name: "",
                photo: "",
                friendDifference: Infinity
            };
            
            //Takes the result of the user's survey POST
            var userData = req.body;
            var userScores = userData.scores;

            //Used to calculate the difference between the User's scores and the scores of each user in the database.
            var totalDifference
            
            //here we loop through all the friend possibilities in the database
            for (var i=0; i < friends.length; i++) {
                var currentFriend = friends[i];
                totalDifference = 0;

                console.log(currentFriend.name);

                //here we loop through all the scores of each friend
                for (var j=0; j< currentFriend.length; j++) {
                    var currentFriendScore = currentFriend.score[j];
                    var currentUserScore = userScores[j];

                    totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
                }
                
                //if resets the best match to new friend if difference is less than the current best match
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = currentFriend.name;
                    bestMatch.photo = currentFriend.photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
            
            friends.push(userData);

            res.json(bestMatch);
            
            
    });
};