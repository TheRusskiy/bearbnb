import { Template } from 'meteor/templating';

Template.myPostings.onCreated(function(){
    this.subscribe('myPostings')
});

Template.myPostings.helpers({
    myPostings: function (){
        return Postings.find({userId: Meteor.userId()})
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