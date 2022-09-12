import { gql } from "urql";

const CREATE_INVOICE = gql`
  mutation CreateInoive(
    $serviceName: String!
    $stripeServiceId: String!
    $client: ID!
    $limitCalls: Int!
    $limitCallsVirtual: Int!
    $category: String!
    $checkoutId: String!
  ) {
    createInvoice(
      data: {
        serviceName: $serviceName
        stripeServiceId: $stripeServiceId
        client: { connect: { id: $client } }
        limitCalls: $limitCalls
        limitCallsVirtual: $limitCallsVirtual
        category: $category
        checkoutId: $checkoutId
      }
    ) {
      id
    }
  }
`;

const PUBLISH_INVOICE = gql`
  mutation PublishInvoice($id: ID!) {
    publishInvoice(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const DELETE_INVOICE = gql`
  mutation DelInvoice($id: ID!) {
    deleteInvoice(where: { id: $id }) {
      id
    }
  }
`;

const UPDATE_SUB_ID_INVOICE = gql`
  mutation UpdateSubIdInvoice($id: ID!, $paymentIntentId: String!) {
    updateInvoice(
      where: { id: $id }
      data: { paymentIntentId: $paymentIntentId }
    ) {
      id
    }
  }
`;

export {
  CREATE_INVOICE,
  PUBLISH_INVOICE,
  DELETE_INVOICE,
  UPDATE_SUB_ID_INVOICE,
};
