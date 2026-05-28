export default {
      const targetUrl = new URL(target);

      const blockedHosts = [
        "localhost",
        "127.0.0.1",
        "0.0.0.0",
      ];

      if (blockedHosts.includes(targetUrl.hostname)) {
        return new Response("Blocked host", {
          status: 403,
          headers: corsHeaders,
        });
      }

      const headers = new Headers(request.headers);

      headers.delete("host");
      headers.delete("cf-connecting-ip");
      headers.delete("cf-ipcountry");
      headers.delete("cf-ray");
      headers.delete("cf-visitor");
      headers.delete("x-forwarded-for");
      headers.delete("x-real-ip");

      const proxyRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers,
        body:
          request.method === "GET" || request.method === "HEAD"
            ? undefined
            : request.body,
        redirect: "manual",
      });

      const response = await fetch(proxyRequest);

      const responseHeaders = new Headers(response.headers);

      Object.entries(corsHeaders).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      responseHeaders.delete("content-security-policy");
      responseHeaders.delete("x-frame-options");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: err.message,
        }),
        {
          status: 500,
          headers: {
            "content-type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  },
};