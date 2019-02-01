import composeWithJson from 'graphql-compose-json';
import LocationTC from './Location';
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByIdListResolver
} from '../../utils';


const restApiResponse = {
  id: 48,
  status: 'publish',
  title: {
    rendered: 'Craft Carnival'
  },
  acf: {
    event_url: 'http://localhost:8080/wp-content/uploads/2018/07/Craft-Carnival-2018-ad1.jpg',
    event_description: 'event description',
    event_start_day: '06/16/2018',
    event_start_time: '2:00 pm',
    event_end_day: '06/16/2018',
    event_end_time: '8:00 pm',
    event_background: 'http://localhost:8080/wp-content/uploads/2018/07/Craft-Carnival-2018-ad1.jpg',
    event_page_hero: 'http://localhost:8080/wp-content/uploads/2018/07/Craft-Carnival-2018-ad1.jpg',
    event_type: 'event type',
    locations: [
      103
    ]
  }

};


const EventTC = composeWithJson('Event', restApiResponse);


export const EventGraphQLType = EventTC.getType();

createFindByIdResolver(EventTC, 'events');
createFindByUrlListResolver(EventTC);
createFindAllResolver(EventTC, 'events');
createFindByIdListResolver(EventTC, 'events');

EventTC.addRelation('locations', {
  resolver: () => LocationTC.getResolver('findByIdList'),
  prepareArgs: {
    ids: source => source.acf.locations
  }
});

export function getEventResolvers() {
  return {
    allEvents: EventTC.getResolver('findAll'),
    eventById: EventTC.getResolver('findById')
  };
}

export default EventTC;
