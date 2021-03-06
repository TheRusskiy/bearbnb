import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.publish("myPostings", function () {
    if (this.userId) {
        return Postings.find({userId: this.userId}, {fields: {title: 1, description: 1, userId: 1, images: 1}});
    }
});
Meteor.publish("postings", function () {
    return Postings.find({}, {fields: {title: 1, description: 1, userId: 1, images: 1}});
});
Meteor.publish("me", function () {
    if (this.userId) {
        return Meteor.users.find(this.userId);
    }
});
Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, firstName: 1, lastName: 1, _id: 1}});
});
Meteor.publish("images", function () {
    return Images.find()
});

Images.allow({
    'insert': function (userId, doc) {
        return !!userId;
    },
    'update': function (userId, doc) {
        return doc.userId === userId
    },
    'remove': function (userId, doc) {
        return doc.userId === userId
    },
    'download' :function(){
        return true;
    }
});