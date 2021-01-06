import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/local';

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Successfully connected to MongoDB');
    }
  },
);

const schema = new mongoose.Schema(
  {
    name: String,
    type: String,
  },
  { timestamps: true },
);
const vendors = mongoose.model('Vendor', schema);

export { vendors };
