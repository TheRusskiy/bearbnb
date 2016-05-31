Meteor.methods({
    createPosting: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.title || !attrs.description) throw new Meteor.Error('form-error', 'Please fill in all the fields')
        }
        Postings.insert({
            userId: Meteor.userId(),
            title: attrs.title,
            description: attrs.description
        })
    },
    removePosting: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.id) throw new Meteor.Error('form-error', 'No id provided!')
        }
        Postings.remove(attrs.id)
    }
})