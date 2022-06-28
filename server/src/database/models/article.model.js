const mongoose = require('mongoose');

const { isNotEmptyString } = require('../../application/helpers/types.helper');

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    data: [
      new Schema(
        {
          key: { type: String },
          value: { type: String },
        },
        { toJSON: { virtuals: true } }
      ),
    ],
    fileUrl: { type: String },
    uniqueKeyword: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
articleSchema.post('validate', function () {
  this.uniqueKeyword = generateUniqueKeyword(this.title);
});

function generateUniqueKeyword(title) {
  return isNotEmptyString(title) ? title.replace(/ /g, '').toLowerCase() : title;
}

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
