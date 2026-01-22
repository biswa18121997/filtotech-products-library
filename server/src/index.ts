import express from 'express';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit';
import 'dotenv/config';
import mongoose from 'mongoose';

const PORT : any = process.env.PORT || 8086 ;
const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})
app.use(limiter);
var whitelist = ['http://example1.com', 'http://example2.com','*']
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors());
const MONGODB_URI : string= process.env.MONGODB_CLUSTER_URI as string;
console.log(MONGODB_URI);
app.listen(PORT,()=>{
    mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB successfully!');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
    console.log('Server is Live at PORT: ', PORT)
})


