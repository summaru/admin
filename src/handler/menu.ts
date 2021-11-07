import express from 'express';
import getListHandler from './meun/get';
import {chkSession,login} from './login';
import createHandler from './meun/create';
import deleteHandler from './meun/delete';

export default {
    publicHandler : {
        getList : getListHandler,
        adminLogin : login,
        sessionCheck : chkSession
    },

    privateHandler : {
        create : createHandler,
        delete : deleteHandler
    }
}