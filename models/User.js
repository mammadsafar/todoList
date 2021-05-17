const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const essentialSchema = {
    type: String,
    trim: true,
};

const userSchema = new mongoose.Schema({
    username: {
        ...essentialSchema,
        unique: true,
        required: true,
        // validate(value) {
        //     let reg = /^[a-z0-9 .@_]{4,}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("firstName could be have a-z A-Z _@. ang be greater thar 4 characters.");
        //     }
        // }
    },
    password: {
        ...essentialSchema,
        required: true,
        // validate(value) {
        //     let reg = /{8,20}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("password should be between 8 and 20 characters.");
        //     }
        // }

    },
    email: {
        ...essentialSchema,
        validate(value) {
            let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!reg.test(value)) {
                throw new Error("Email address not valid.");
            }
        },
        default: 'NoBody@email.com'

    },
    createAt: {
        type: Date,
        default: new Date(),
    },


})

userSchema.pre('save', function (next) {
    const user = this;
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    };
});

userSchema.pre("findOneAndUpdate", function (next) {
    if (this.getUpdate().$set) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
        this.getUpdate().$set.password = hash;
        next();
    } else {
        next();
    }
});




module.exports = mongoose.model('User', userSchema);