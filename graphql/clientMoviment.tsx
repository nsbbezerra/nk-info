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

export { FIND_CLIENT_SUBSCRIPTIONS };
