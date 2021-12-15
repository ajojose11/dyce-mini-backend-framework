const mongoose = require('mongoose');

const newLocal = 'User';
const ClusterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    cloudProvider: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    homedir: {
      type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Cluster_Network', ClusterSchema);