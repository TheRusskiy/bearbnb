Meteor.methods({
    createPosting: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.title || !attrs.description) throw new Meteor.Error('form-error', 'Please fill in all the fields')
        }
        return Postings.insert({
            userId: Meteor.userId(),
            title: attrs.title,
            description: attrs.description
        })
    },
    updatePosting: (id, attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!id) throw new Meteor.Error('form-error', 'Id needs to be specified!')
        }
        let toUpdate = {}
        for (var k in attrs) {
            if (attrs.hasOwnProperty(k) && ['images', 'title', 'description'].indexOf(k) !== -1) {
                toUpdate[k] = attrs[k]
            }
        }
        return Postings.update({_id: id, userId: Meteor.userId()}, {$set: toUpdate})
    },
    removePosting: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.id) throw new Meteor.Error('form-error', 'No id provided!')
        }
        Images.remove({_id: {$in: Postings.find(attrs.id).images || []}})
        Postings.remove(attrs.id)
    }
})