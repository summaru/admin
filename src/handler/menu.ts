import express from 'express';
import getListHandler from './meun/get';
import createHandler from './meun/create';
import deleteHandler from './meun/delete';

export default {
    publicHandler : {
        getList : getListHandler
    },

    privateHandler : {
        create : createHandler,
        delete : deleteHandler
    }
}