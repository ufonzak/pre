module.exports = function inj(express, http, path, cors, compression, morgan, bodyParser, Q) {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan(':date[iso] - web: :method :url :status :res[content-length] - :response-time ms'));

  app.use(bodyParser.raw({ type: 'image/*' }));
  app.use(bodyParser.json());

  app.get('/hello', (req, res) => res.send({ text: 'Hello' }));

  // app.use(express.static(path.resolve(__dirname, '../client')));
  // app.use((req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

  const server = new http.Server(app);

  return {
    start: () => Q.nfcall(server.listen.bind(server), 5000),
    stop: () => server.close(),
  };
};
