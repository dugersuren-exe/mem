const { connectToDatabase } = require('../../utils/connectDb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}

// Getting all posts.
async function getPosts(req, res) {
    try {
        let { db } = await connectToDatabase();
        let words = await db
            .collection('words')
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(words)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new post
async function addPost(req, res) {
    try {
        let { db } = await connectToDatabase();
        console.log("hi----->",req.body);
        await db.collection('words').insertOne(req.body);
        
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Updating a post
async function updatePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('words').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).meзүssage,
            success: false,
        });
    }
}

// deleting a post
async function deletePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('words').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
