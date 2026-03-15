import mongoose from 'mongoose';

const isMongoAtlasNetworkIssue = (message = '') => {
  const m = message.toLowerCase();
  return (
    m.includes('could not connect to any servers') ||
    m.includes('ssl routines') ||
    m.includes('tlsv1 alert') ||
    m.includes('server selection') ||
    m.includes('replicasetnoprimary')
  );
};

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      'MONGO_URI is not set. Create backend/.env from backend/.env.example and provide a valid MongoDB connection string.'
    );
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 10000),
      connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS || 10000),
    });
    console.log('MongoDB connected');
  } catch (error) {
    const details = error?.message || 'Unknown MongoDB connection error';

    if (isMongoAtlasNetworkIssue(details)) {
      throw new Error(
        [
          'Unable to connect to MongoDB Atlas.',
          'Checklist:',
          '- Whitelist your current IP in Atlas Network Access (or temporarily allow 0.0.0.0/0 for testing).',
          '- Verify DATABASE user credentials in MONGO_URI.',
          '- Ensure Atlas cluster is running and reachable from your network/VPN.',
          '- If TLS errors persist, test from another network and verify local firewall/SSL interception settings.',
          `Original error: ${details}`,
        ].join('\n')
      );
    }

    throw new Error(`MongoDB connection failed: ${details}`);
  }
};