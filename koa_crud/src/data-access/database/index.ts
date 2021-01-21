import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const initializeDatabase = async (): Promise<void> => {
  const uri =
    process.env.NODE_ENV === 'test'
      ? await mongod.getConnectionString()
      : 'mongodb://mongo:27017/onboarding';

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);

  mongoose.set('runValidators', true);
};
