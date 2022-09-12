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

export {
  FIND_CLIENT_SUBSCRIPTIONS,
  CREATE_EQUIPMENT,
  PUBLISH_EQUIPMENT,
  FIND_EQUIPMENTS,
};
