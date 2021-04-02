import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'stock',
    uiExports: {
      app: {
        title: 'Stock',
        description: 'Stock',
        main: 'plugins/stock/app',
      },
      hacks: [
        'plugins/stock/hack'
      ],
      styleSheetPaths: require('pa