import bunyan from 'bunyan';
import format from 'bunyan-format';

const debug = std => std.isTTY ? format({out: std}) : std;

const name = process.env.LOG_NAME;

if (typeof name !== 'string') {
  throw new TypeError('Log name must be defined in environment');
}

export default bunyan.createLogger({
  name,
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: 'info',
      stream: debug(process.stdout)
    },
    {
      level: 'error',
      stream: debug(process.stderr)
    }
  ]
});
