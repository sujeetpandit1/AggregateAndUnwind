const mongoose = require('mongoose');
const companyModel = require('../models/companyModel')
const sequence = require('mongoose-sequence')(mongoose);

const adSchema = new mongoose.Schema({

    id: Number,
    companyId: { 
        type: mongoose.Schema.Types.Number, 
        ref:'companies',
        trim:true
    },
    primaryText: {
      type: String,
      required: true
    },
    headline: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
  
  adSchema.plugin(sequence, { inc_field: 'id', startAt: 1, step: 2, unique: true });
  module.exports = mongoose.model('Ads', adSchema);