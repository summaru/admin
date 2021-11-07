import express from 'express';
import {chkSession,login} from './login';
import * as menu from './meun';

export default {
    publicHandler : {
        getList : menu.selectHandler,
        adminLogin : login,
        sessionCheck : chkSession
    },

    privateHandler : {
        create : menu.createHandler,
        delete : menu.deleteHandler
    }
}