const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql")

const Player = require('../models/Player')
const Week = require('../models/Week')

const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    groups: { type: GraphQLList(GraphQLString) }
  }),
})


const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLID },
    home: { type: GraphQLString },
    away: { type: GraphQLString },
    winner: { type: GraphQLString },
    weekId: { GraphQLID },
    seasonId: { type: GraphQLID }
  }),
})

const PredictionType = new GraphQLObjectType({
  name: "Prediction",
  fields: () => ({
    id: { type: GraphQLID },
    playerId: { type: GraphQLID },
    gameId: { type: GraphQLID },
    predictedWinner: { type: GraphQLString }
  })
})

const WeekType = new GraphQLObjectType({
  name: "Week",
  fields: () => ({
    id: { type: GraphQLID },
    weekNumber: { type: GraphQLInt },
    seasonId: { type: GraphQLID },
    predictionIds: { type: GraphQLList(GraphQLID) },
  })
})


const SeasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    id: { type: GraphQLID },
    playerIds: { type: GraphQLList(GraphQLID) },
    weekIds: { type: GraphQLList(GraphQLID) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return Player.find();
      },
    },
    player: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Player.findById(args.id);
      },
    },
    weeks: {
      type: new GraphQLList(WeekType),
      resolve(parent, args) {
        return Week.find();
      },
    },
    week: {
      type: WeekType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Week.findById(args.id);
      },
    },
  },
});


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        groups: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const player = new Player({
          name: args.name,
          email: args.email,
          groups: args.groups || [],
        });

        return player.save();
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
