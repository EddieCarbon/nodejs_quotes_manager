
const MongoSingleton = require("../data/mongoSingleton"); 
const ObjectId = require("mongodb").ObjectId; 

function saveAll(quotes) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.insertMany(quotes);

        if (result.insertedCount) {
            resolve(result);
        } else {
            reject("Couldn't save quotes.");
        }
    } );
}

function getAll() {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();  
        const cursor = await collection.find();
        const results = await cursor.toArray(); 

        if (results.length > 0) {
            resolve(results);
        } else {
            reject("Can't get all quotes.");
        }
    } );
}


function getById(id) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.findOne({_id: new ObjectId(id)});
        
        if (result) {
            resolve(result);
        } else {
            reject("Can't get quote by id: " + id);
        }
    } );
} 

function deleteById(id) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.deleteMany({_id: new ObjectId(id)});

        if (result && result.deletedCount > 0) {
            resolve(result);
        } else {
            reject("Can't delete quote by id: " + id);
        }
    } );
}

function updateById(id, updateFields) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.updateOne(
            { _id: new ObjectId(Id) }, 
            { $set: updateFields }
        );
        
        if (result && result.modifiedCount > 0) {
            resolve(result);
        } else {
            reject("Can't update quote by id: " + id);
        }
    })
}

function insertOne(quote) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.insertOne(quote);

        if (result && result.insertedId) {
            resolve(result);
        } else {
            reject("Can't insert new quote");
        }
    } );
}


module.exports = {
    getAll,
    getById,
    saveAll,
    deleteById,
    updateById,
    insertOne
};


