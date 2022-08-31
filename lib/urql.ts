import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "https://api-sa-east-1.hygraph.com/v2/cl6zk2iu80ktw01uefw9qbnpp/master",
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
});

export { client, ssrCache };
