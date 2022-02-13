import App from './components/App';
import getSingletonStore from './modules/getSingletonStore';
const app = new App({ key: 'app' });
const store = getSingletonStore();
store.subscribe('app', app.render.bind(app));
