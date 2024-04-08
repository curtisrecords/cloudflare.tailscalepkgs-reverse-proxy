addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const PROXY_DOMAIN = "pkgs.tailscale.com";
const DL_TAILSCALE_DOMAIN = "https://dl.tailscale.com/";
const WORKER_DOMAIN = "edit-your-domain-here.workers.dev";

async function handleRequest(request) {
  // check the original request URL, remove the protocol and hostname parts, and keep only the path and query parameters.
  const url = new URL(request.url);
  const pathAndQuery = url.pathname + url.search;

  // construct a new proxy URL
  const proxyUrl = new URL(`https://${PROXY_DOMAIN}${pathAndQuery}`);
  
  // create a new request object
  const modifiedRequest = new Request(proxyUrl, request);
  modifiedRequest.headers.set("Host", PROXY_DOMAIN);

  let response = await fetch(modifiedRequest);

  // check 302
  if (response.status === 302) {
    const location = response.headers.get("Location");
    if (location && location.startsWith(DL_TAILSCALE_DOMAIN)) {
      // follow redirect
      response = await fetch(location);
    }
  }

  // return
  return response;
}
