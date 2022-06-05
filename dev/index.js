import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { serverFunctions } from '../src/client/utils/serverFunctions.ts';

const { FILENAME, HOST, PORT } = process.env;

const DevServer = () => {
  const iframe = React.useRef(null);
  useEffect(() => {
    const handleRequest = event => {
      const request = event.data;
      const { type, functionName, id, args } = request;

      if (type !== 'REQUEST') return;

      serverFunctions[functionName](...args)
        .then(response => {
          iframe.current.contentWindow.postMessage(
            { type: 'RESPONSE', id, status: 'SUCCESS', response },
            `https://${HOST}:${PORT}`
          );
        })
        .catch(err => {
          iframe.current.contentWindow.postMessage(
            {
              type: 'RESPONSE',
              id,
              status: 'ERROR',
              response: err,
            },
            `https://${HOST}:${PORT}`
          );
        });
    };

    window.addEventListener('message', handleRequest, false);
  }, []);

  return (
    <div
      // we want our dev environment to fill the dialog window
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <iframe
        style={{
          width: '100%',
          height: '100%',
          border: '0',
          position: 'absolute',
        }}
        ref={iframe}
        src={`https://${HOST}:${PORT}/${FILENAME}-impl.html`}
      />
    </div>
  );
};

ReactDOM.render(<DevServer />, document.getElementById('index'));
