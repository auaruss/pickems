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


const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    playerGroup: { type: GraphQLString },
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
