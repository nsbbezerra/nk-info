import { gql } from "urql";

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $name: String!
    $email: String!
    $phone: String!
    $message: String!
  ) {
    createMessage(
      data: {
        name: $name
        email: $email
        phone: $phone
        message: $message
        readed: false
      }
    ) {
      id
    }
  }
`;

const PUBLISH_MESSAGE = gql`
  mutation PublishMessage($id: ID!) {
    publishMessage(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export { CREATE_MESSAGE, PUBLISH_MESSAGE };
