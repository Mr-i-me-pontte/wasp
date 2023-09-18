/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTokens = /* GraphQL */ `
  mutation CreateTokens(
    $input: CreateTokensInput!
    $condition: ModelTokensConditionInput
  ) {
    createTokens(input: $input, condition: $condition) {
      id
      symbol
      value
      variation
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTokens = /* GraphQL */ `
  mutation UpdateTokens(
    $input: UpdateTokensInput!
    $condition: ModelTokensConditionInput
  ) {
    updateTokens(input: $input, condition: $condition) {
      id
      symbol
      value
      variation
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteTokens = /* GraphQL */ `
  mutation DeleteTokens(
    $input: DeleteTokensInput!
    $condition: ModelTokensConditionInput
  ) {
    deleteTokens(input: $input, condition: $condition) {
      id
      symbol
      value
      variation
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createSerasaReport = /* GraphQL */ `
  mutation CreateSerasaReport(
    $input: CreateSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    createSerasaReport(input: $input, condition: $condition) {
      id
      type
      documentNumber
      pipefyId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateSerasaReport = /* GraphQL */ `
  mutation UpdateSerasaReport(
    $input: UpdateSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    updateSerasaReport(input: $input, condition: $condition) {
      id
      type
      documentNumber
      pipefyId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteSerasaReport = /* GraphQL */ `
  mutation DeleteSerasaReport(
    $input: DeleteSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    deleteSerasaReport(input: $input, condition: $condition) {
      id
      type
      documentNumber
      pipefyId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
