const graphql = require('graphql')
const GraphQLScalarType = graphql.GraphQLScalarType
const language = require('graphql/language')
const Kind = language.Kind

const toBigNumber = (value) => {
  if (value == '') throw new TypeError('BigNumber cannot represent empty string')

  let bigNumber = Number(value)
  if (bigNumber >= Number.MIN_SAFE_INTEGER
    && bigNumber <= Number.MAX_SAFE_INTEGER) return bigNumber

  throw new TypeError('Could not represent value ', value)
}

const toValue = (arg) => {
  if (arg.kind != Kind.INT) return null

  let number = parseInt(arg.value)
  if (number >= Number.MIN_SAFE_INTEGER
    && number <= Number.MAX_SAFE_INTEGER) return number

  return null
}

const BigNumber = new GraphQLScalarType({
  name: 'BigNumber',
  description: 'Supports numbers bigger than int32',
  parseLiteral: toValue,
  parseValue: toBigNumber,
  serialize: toBigNumber
})

module.exports = BigNumber
