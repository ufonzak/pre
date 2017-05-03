module.exports = function inj(config, express, http, path, cors, compression, morgan, bodyParser, Promise, apiRouter) {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan(':date[iso] - web: :method :url :status :res[content-length] - :response-time ms'));

  app.use(bodyParser.raw({ type: 'image/*' }));
  app.use(bodyParser.json());

  app.get('/hello', (req, res) => res.json({ text: 'Hello' }));
  app.use('/api', apiRouter);

  // app.use(express.static(path.resolve(__dirname, '../client')));
  // app.use((req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

  const server = new http.Server(app);

  return {
    start: () => Promise.promisify(server.listen.bind(server))(config.port),
    stop: () => server.close(),
  };
};
