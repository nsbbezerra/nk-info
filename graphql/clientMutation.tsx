const CreateClient = `
  mutation ($name: String!, $document: String!, $typeDocument: String!, $email: String!, $phone: String!, $street: String!, $fantasyName: String!, $number: String!, $comp: String!, $district: String!, $cep: String!, $city: String!, $state: String!) {
    createClient (data: {name: $name, document: $document, typeDocument: $typeDocument, email: $email, phone: $phone, street: $street, number: $number, fantasyName: $fantasyName, comp: $comp, district: $district, cep: $cep, city: $city, state: $state}) {
      id
      name
      document
      typeDocument
      email
      phone
      street
      number
      fantasyName
      comp
      district
      cep
      city
      state
    }
  }
`;

export { CreateClient };
