const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String
    username: String
    firstname: String
    lastname: String
    email: String,
    groups: [Group]
  }

	type Group {
		id: String
		name: String
		description: String
	}

  type Query {
    users: [User]
    user(id: String): User
		groups: [Group]
    group(id: String): Group
  }

`;

const users = [
  {
  	id: '6f2b329a-5ae2-43e7-ae3d-44b863d3092f',
  	username: 'elise',
  	firstname: 'Elise',
  	lastname: 'kroger',
  	email: 'ekruger@gmail.com',
    groups: ['e242b343-4505-420a-a828-206fa765312d']
  },
  {
  	id: '05fa8fa2-c31d-4488-8b9c-ddabf81578e8',
  	username: 'sophie',
  	firstname: 'Sophie',
  	lastname: 'Vignier',
  	email: 'sophie.vignier@hotmail.com',
    groups: ['c369cdb3-362a-496d-b33e-51bd593710e9']
  },
  {
  	id: 'addfd550-7e35-4d03-8a71-9bd5a963aa48',
  	username: 'aurelie',
  	firstname: 'Aurelie',
  	lastname: 'May',
  	email: 'aurelie.may@gmail.com',
    groups: ['0c6b32d6-776a-45eb-b8f6-5bc62d9cf61d']
  }
];

const groups = [
  {
    id: 'e242b343-4505-420a-a828-206fa765312d',
    name: 'Admin',
    description: 'Group for administrator',
  },
  {
    id: 'c369cdb3-362a-496d-b33e-51bd593710e9',
    name: 'Dietetician',
    description: 'Group for dietetician',
  },
  {
    id: '0c6b32d6-776a-45eb-b8f6-5bc62d9cf61d',
    name: 'Agent',
    description: 'Group for agent',
  }
];

const resolvers = {
  Query: {
		users: () => users,
    user: (_, {id}) => users.find(({id: uid}) => uid === id),
		groups: () => groups,
    group: (_, {id}) => groups.find(({id: gid}) => gid === id)
  },
  User: {
    groups: ({groups: grps}) => grps.map(id => groups.find(({id: gid}) => gid === id))
  }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server is listening on ${url}`);
});
