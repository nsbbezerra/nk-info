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

export { CREATE_INVOICE, PUBLISH_INVOICE };
