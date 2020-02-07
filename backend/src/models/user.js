import mongooese from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongooese.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 7
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address!'});
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

UserSchema.pre('save', async function (next) {
    //hash password before saving new user
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    //generate token for user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    console.log(token);
    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    //search user by email and password
    const user = await UserSchema.findOne({email});
    if (!user) {
        throw new Error({error: 'Invalid email!'});
    }
    const isPassword = await bcrypt.compare(user.password, password);
    if (!isPassword) {
        throw new Error({error: 'Invalid password!'});
    }
    return user;
}

export default mongooese.model('User', UserSchema);