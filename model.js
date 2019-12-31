import {
    voterSchema
} from './schema/Voter';
import {
    adminSchema
} from './schema/Admin';
import {
    candidateSchema
} from './schema/Candidate'

// const voterSchema = require('./schema/Voter');
// const adminSchema = require('./schema/Admin');
// const candidateSchema = require('./schema/Candidate');

export const models =  (app, mongoose) => {
    voterSchema(app, mongoose);
    adminSchema(app, mongoose);
    candidateSchema(app, mongoose);
}