import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mockery from 'mockery';
import requireUncached from 'require-uncached';

chai.use(sinonChai);

describe('env-bunyan', () => {
  describe('exports', () => {
    it('should expose a default function', () => {
      process.env.LOG_NAME = 'test';
      expect(require('../src')).to.be.an('Object');
    });
  });

  describe('debug', function () {
    this.timeout(5000);
    let format;

    after(() => {
      mockery.disable();
      mockery.deregisterAll();
    });

    beforeEach(() => {
      format = sinon.stub().returns(process.stdout);

      mockery.registerMock('bunyan-format', format);
      mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
      });
    });

    it('should pretty print on debug', () => {
      require('../src');

      expect(format).to.have.callCount(2);
    });

    it('should not pretty print on prod', () => {
      process.stdout.isTTY = false;
      process.stderr.isTTY = false;

      require('../src');

      expect(format).to.have.callCount(0);
    });
  });

  describe('env-bunyan', () => {
    describe('with invalid values', () => {
      it('should throw a type error', () => {
        delete process.env.LOG_NAME;


        expect(() => requireUncached('../src')).to.throw(TypeError, 'Log name must be defined in environment');
      });
    });

    describe('with valid values', () => {
      it('should not throw an error', () => {
        process.env.LOG_NAME = 'test';
        expect(() => requireUncached('../src')).to.not.throw(TypeError, 'Log name must be defined in environment');
      });
    });
  });
});