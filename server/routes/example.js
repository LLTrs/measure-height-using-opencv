export default function (server) {

  server.route({
    path: '/api/stock/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
