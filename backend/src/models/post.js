import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
    category: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

PostSchema.plugin(mongoosePaginate);

export default mongoose.model('post', PostSchema);