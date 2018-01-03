const MainService = require('./MainService');
const AWS = require('aws-sdk');
const ses = new AWS.SES();

module.exports = class MailService extends MainService {
  constructor(props) {
    super('Mail Service');
    this._setMailParams(props);
    this._setServiceProvider();
  }

  _setServiceProvider() {
    this._serviceProvider = ses;
    return this._serviceProvider;
  }

  /**
   * 
   * @param {object} params 
   * @param {string} to 
   * @param {string} from 
   * @param {string} subject 
   * @param {object} params.body 
   * @param {string} params.body.html 
   * @param {string} params.body.text 
   */
  _setMailParams(params) {
    this._mailParams = {
      Destination: {
        ToAddresses: Array.isArray(params.to) ? params.to : [params.to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: params.body.html,
          },
          Text: {
            Charset: 'UTF-8',
            Data: params.body.text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: params.subject,
        },
      },
      ReturnPath: params.from,
      Source: params.from,
    };
    return this._mailParams;
  }

  _getServiceProvider() {
    return this._serviceProvider;
  }

  _getMailParams() {
    return this._mailParams;
  }

  send() {
    const self = this;
    
    return Promise((resolve, reject) => {
      self._getServiceProvider().sendEmail(self._getMailParams(), (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
};
