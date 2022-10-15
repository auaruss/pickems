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

const Week = require('../models/Week')
const Game = require('../models/Game')
const Player = require('../models/Player')
const Season = require('../models/Season')
const Prediction = require('../models/Prediction')

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
    weekId: { type: GraphQLID },
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
        return Player.find()
      },
    },

    player: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Player.findById(args.id)
      },
    },

    weeks: {
      type: new GraphQLList(WeekType),
      resolve(parent, args) {
        return Week.find()
      },
    },
    week: {
      type: WeekType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Week.findById(args.id)
      },
    },

    getWeekByNumber: {
      type: WeekType,
      args: { weekNumber: { type: GraphQLNonNull(GraphQLInt) } },
      resolve(parent, args) {
        return Week.findOne({ weekNumber: args.weekNumber })
      }
    },

    getGamesByWeekId: {
      type: GraphQLList(GameType),
      args: { weekId: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Game.find({ weekId: args.weekId })
      }
    }
  },
})


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        groups: { type: GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        const player = new Player({
          name: args.name,
          email: args.email,
          groups: args.groups || [],
        })

        return player.save()
      },
    },

    createSeason: {
      type: SeasonType,
      args: {
        playerIds: { type: GraphQLList(GraphQLID) },
        weekIds: { type: GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        const season = new Season({
          playerIds: args.playerIds || [],
          weekIds: args.weekIds || []
        })

        return season.save()
      }
    },

    createWeek: {
      type: WeekType,
      args: {
        weekNumber: { type: GraphQLNonNull(GraphQLInt) },
        seasonId: { type: GraphQLNonNull(GraphQLID) },
        predictionIds: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const week = new Week({
          weekNumber: args.weekNumber,
          seasonId: args.seasonId,
          predictionIds: args.predictionIds || []
        })

        return week.save()
      }
    },

    createGame: {
      type: GameType,
      args: {
        home: { type: GraphQLNonNull(GraphQLString) },
        away: { type: GraphQLNonNull(GraphQLString) },
        winner: { type: GraphQLString },
        weekId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const game = new Game({
          home: args.home,
          away: args.away,
          winner: args.winner || 'TBD',
          weekId: args.weekId,
        })

        return game.save()
      }
    },

    createPrediction: {
      type: PredictionType,
      args: {
        playerId: { type: GraphQLNonNull(GraphQLID) },
        gameId: { type: GraphQLNonNull(GraphQLID) },
        predictedWinner: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const prediction = new Prediction({
          playerId: args.playerId,
          gameId: args.gameId,
          predictedWinner: args.predictedWinner
        })

        return prediction.save()
      }
    },

    addPlayerToSeason: {
      type: SeasonType,
      args: {
        seasonId: { type: GraphQLID },
        playerId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const season = Season.findByIdAndUpdate(
          args.seasonId,
          { $push: { playerIds: args.playerId } }
        )

        return season
      }
    },

    addWeekToSeason: {
      type: SeasonType,
      args: {
        seasonId: { type: GraphQLID },
        weekId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const season = Season.findByIdAndUpdate(
          args.seasonId,
          { $push: { weekIds: args.weekId } }
        )

        return season
      }
    },

    addPredictionToWeek: {
      type: WeekType,
      args: {
        predictionId: { type: GraphQLNonNull(GraphQLID) },
        weekId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const week = Week.findByIdAndUpdate(
          args.weekId,
          { $push: { predictionIds: args.predictionId } }
        )

        return week
      }
    },

    updateGameWinner: {
      type: GameType,
      args: {
        winner: { type: GraphQLString },
        gameId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Game.findByIdAndUpdate(args.gameId, { winner: args.winner })
      }
    }

    // updatePrediction: {

    // },
    
    // updatePlayer: {

    // },

    // deletePrediction: {

    // },

    // deletePlayer: {

    // }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
