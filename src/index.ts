import {JSDOM} from 'jsdom';
import pkg from '../package.json';

export class JQInsert {
    private options: {
        contentType: 'text/html',
    };
    private version = pkg.dependencies.jquery;

    public insert(){
        JSDOM.fromFile('./index.html', this.options).then((dom) => {
           let firstScript = dom.window.document.querySelectorAll('body script');
            /*
            <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.5.0.min.js"><\/script>')</script>*/
        });
    }
}