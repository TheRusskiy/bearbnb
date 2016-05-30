import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.publish("myPostings", function () {
    if (this.userId) {
        return Postings.find({userId: this.userId}, {fields: {title: 1, description: 1, userId: 1}});
    }
});