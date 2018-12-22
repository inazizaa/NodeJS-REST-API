'use strict';

exports.ok = function(values, res){
    var data={
        'status' : 77,
        'values' : values
    };
    res.json(data);
    res.end();
};

exports.error = function(values, res){
    var data ={
        'status': 1212,
        'values' : values
    };
    res.json(data);
    res.end();
};

exports.datanotfound = function(values,res){
    var data ={
        'status' : 0,
        'values' : (values ? values : 'data not found')
    };
    res.json(data);
    res.end();
};