import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const url = process.env.URI_GRAPHQL || "";

const client = createClient({
  url: url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
  fetchOptions: () => {
    const token = process.env.PERMANENT_AUTH_TOKEN;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});

export { client, ssrCache };
