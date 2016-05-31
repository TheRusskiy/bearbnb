import { Template } from 'meteor/templating';

Template.allPostings.onCreated(function(){
    this.subscribe('postings')
    this.subscribe('images')
});

Template.postingPreview.onCreated(function(){
    this.subscribe('postings')
    this.subscribe('images')
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
    }
})