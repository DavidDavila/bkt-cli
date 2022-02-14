
import ora from 'ora';

const spinner = ora();

class Spinner {
  #spinner = ora();
  start ( text, color ) {
    this.#spinner = ora( text ).start();
    color && ( this.#spinner.color = color );
  };
  stop () {
    this.#spinner.stop();
  }
}

export default new Spinner();