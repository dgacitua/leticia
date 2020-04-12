import Mongoose from 'mongoose';
import { mongoUrl } from '../constants';

Mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});