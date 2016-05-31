Meteor.methods({
    removeImage: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.id || !attrs.postingId) throw new Meteor.Error('form-error', 'No id provided!')
        }
        Images.remove({_id: attrs.id})
        Postings.update({_id: attrs.postingId}, {$pull: {images: attrs.id}})
    }
})