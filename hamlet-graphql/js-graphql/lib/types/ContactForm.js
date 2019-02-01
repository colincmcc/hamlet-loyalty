import { TypeComposer } from 'graphql-compose';


export const ContactFormTC = TypeComposer.create({
  name: 'ContactForm',
  fields: {
    to: ['String!'],
    from: 'String!',
    subject: 'String!',
    html: 'String!',
    status: 'String'
  }
});
