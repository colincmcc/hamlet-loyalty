import { GQC } from 'graphql-compose';
import fetch from 'node-fetch';
import mailgun from 'mailgun.js';
import { pubsub } from './subscriptions';



require('dotenv').config();

const digitalPourKey = process.env.DIGITAL_POUR_KEY;
const mailgunUrl = process.env.MAILGUN_URL;
const mailgunKey = process.env.MAILGUN_KEY;

// * Sawtooth
// Queries

// Mutations

// Subscriptions


const mgClient = mailgun.client({
  username: 'api',
  key: mailgunKey || ''
});

GQC.rootMutation().addFields({
  mailFormData: {
    type: 'ContactForm',
    args: {
      to: ['String!'],
      from: 'String!',
      subject: 'String!',
      formData: 'String!'
    },
    resolve: async (_, args) => {
      const mgResponse = {};
      mgClient.messages
        .create('iph.colinmac.me', {
          from: args.from,
          to: args.to,
          subject: args.subject,
          text: args.formData
        })
        .then(msg => console.log(msg))
        .catch(err => console.log(err));

      return mgResponse;
    }
  }
});
GQC.rootQuery().addFields({

});

GQC.rootSubscription().addFields({
});

const schema = GQC.buildSchema(); // returns GraphQLSchema

export default schema;
