Postings = new Mongo.Collection('postings')
let imageStore = new FS.Store.GridFS("imagesgr", {});
let imageStoreFS = new FS.Store.FileSystem("imagesfs")

Images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});