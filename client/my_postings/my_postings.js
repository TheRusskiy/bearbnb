import { Template } from 'meteor/templating';

Template.myPostings.onCreated(function(){
    this.subscribe('myPostings')
    this.subscribe('images')
});

Template.myPosting.onCreated(function(){
    this.subscribe('myPostings')
    this.subscribe('images')
});

Template.myPostings.helpers({
    myPostings: function (){
        return Postings.find({userId: Meteor.userId()})
    }
})
Template.myPosting.helpers({
    imageList: function (){
        if (this.images) {
            return Images.find({_id: {$in: this.images}})
        } else {
            return [];
        }
    }
})
Template.myPostings.events({
    'click a.posting-preview-remove'(event){
        event.preventDefault()
        Meteor.call('removePosting', {id: this._id}, (error, result)=>{
            if (error) {
                sAlert.error(error.reason)
            }
        })
    }
})