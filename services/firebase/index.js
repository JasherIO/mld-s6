import config from './config'
import firebase from 'firebase'

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
export default app
export const db = app.database()
