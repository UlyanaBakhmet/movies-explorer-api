const bcrypt = require('bcryptjs'); // импортируем bcrypt для хеширования пароля
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/AuthError'); // 401

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },

    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: [isEmail, 'Некорректный Email'],
    },

    password: {
      type: String,
      required: true,
      select: false, // чтобы API не возвращал хеш пароля
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
