import { Importer } from './src/importer/Importer';
import EventEmitter = require('events');
import { DirWatcher } from './src/dirWatcher/DirWatcher';

const eventEmmiter = new EventEmitter;
const dirWatcher = new DirWatcher(eventEmmiter);
dirWatcher.watch({
    dirpath: './data',
    delay: 1000
});
const importer = new Importer(eventEmmiter);
importer.listen();