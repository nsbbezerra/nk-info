import { gql } from "urql";

const FIND_CLIENT_SUBSCRIPTIONS = gql`
  query FindSubscriptions($id: ID!) {
    invoices(where: { client: { id: $id } }) {
      id
      serviceName
      limitCalls
      limitCallsVirtual
      checkoutId
      category
      activateCode
      paymentIntentId
    }
  }
`;

const FIND_EQUIPMENTS = gql`
  query FindEquipments($id: ID!) {
    equipaments(where: { client: { id: $id } }) {
      id
      owner
      model
      description
      type
    }
  }
`;

const CREATE_EQUIPMENT = gql`
  mutation CreateEquipment(
    $client: ID!
    $type: String!
    $model: String!
    $owner: String!
    $description: String!
  ) {
    createEquipament(
      data: {
        client: { connect: { id: $client } }
        type: $type
        model: $model
        owner: $owner
        description: $description
      }
    ) {
      id
    }
  }
`;

const PUBLISH_EQUIPMENT = gql`
  mutation PublishEquipment($id: ID!) {
    publishEquipament(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const FIND_CALLS_AND_INVOICES = gql`
  query FindCallsAndInvoices($id: ID!, $month: String!, $year: String!) {
    invoices(where: { client: { id: $id }, category: "ti" }) {
      id
      serviceName
      limitCalls
      limitCallsVirtual
      checkoutId
      category
      activateCode
      paymentIntentId
    }
    calls(
      where: { month: $month, year: $year, client: { id: $id } }
      orderBy: createdAt_DESC
    ) {
      dateCall
      description
      callStatus
      id
      month
      year
      invoice {
        id
        serviceName
      }
    }
  }
`;

const CREATE_CALL = gql`
  mutation CreateCall(
    $client: ID!
    $description: String!
    $dateCall: Date!
    $callStatus: String!
    $month: String!
    $year: String!
    $invoice: ID!
  ) {
    createCall(
      data: {
        client: { connect: { id: $client } }
        invoice: { connect: { id: $invoice } }
        description: $description
        dateCall: $dateCall
        callStatus: $callStatus
        month: $month
        year: $year
      }
    ) {
      id
    }
  }
`;

const PUBLISH_CALL = gql`
  mutation PublishCall($id: ID!) {
    publishCall(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const FIND_CALL_TO_COMPARE = gql`
  query FindCallsToCompare($id: ID!, $month: String!, $year: String!) {
    calls(where: { month: $month, year: $year, invoice: { id: $id } }) {
      dateCall
      description
      callStatus
      id
      month
      year
    }
  }
`;

export {
  FIND_CLIENT_SUBSCRIPTIONS,
  CREATE_EQUIPMENT,
  PUBLISH_EQUIPMENT,
  FIND_EQUIPMENTS,
  FIND_CALLS_AND_INVOICES,
  CREATE_CALL,
  PUBLISH_CALL,
  FIND_CALL_TO_COMPARE,
};
