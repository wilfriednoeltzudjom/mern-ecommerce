const StackTracey = require('stacktracey');

function parseErrorAsString(error) {
  if (typeof error === 'string') return error;

  const errorString = new StackTracey(error).withSources().asTable();

  return error.message ? error.message.concat('\n'.concat(errorString)) : '';
}

module.exports = { parseErrorAsString };
