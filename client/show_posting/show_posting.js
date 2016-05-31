import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.showPosting.onCreated(function(){
    this.subscribe('postings')
    this.subscribe('images')
});

Template.showPosting.helpers({
    posting: function (){
        return Postings.findOne({_id: FlowRouter.current().params.posting_id})
    },
    myPosting: function () {
        return Postings.findOne({_id: FlowRouter.current().params.posting_id}).userId === Meteor.userId()
    },
    imageList: function (){
        let posting = Postings.findOne({_id: FlowRouter.current().params.posting_id})
        if (posting.images) {
            return Images.find({_id: {$in: posting.images}})
        } else {
            return [];
        }
    }
})