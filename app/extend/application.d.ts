import {Application} from 'egg';
import SRRouter from "../../lib/routes";
import {SRAccess, SRError} from "../../index";


export default class SRApplication extends Application {
    srRouter: SRRouter
    access: SRAccess
    error: SRError
}
