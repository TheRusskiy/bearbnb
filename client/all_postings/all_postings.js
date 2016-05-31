import { Template } from 'meteor/templating';

Template.allPostings.onCreated(function(){
    this.subscribe('postings')
    this.subscribe('images')
});

Template.postingPreview.onCreated(function(){
    this.subscribe('postings')
    this.subscribe('images')
    this.subscribe('users')
});

Template.allPostings.helpers({
    allPostings: function (){
        return Postings.find({})
    },
    loggedIn: function (){
        return !!Meteor.user()
    }
})
Template.postingPreview.helpers({
    imageList: function (){
        if (this.images) {
            return Images.find({_id: {$in: this.images}})
        } else {
            return [];
        }
    },
    userName: function () {
        let user = Meteor.users.findOne(this.userId)
        return user ? user.emails[0].address.split('@')[0] : 'unknown'
    }
})