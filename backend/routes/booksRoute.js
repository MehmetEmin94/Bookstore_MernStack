    import express from 'express';
    import { Book } from "../models/bookModel.js"
    
    const router=express.Router();

    router.get("/:id",async (request,response)=>{
        try {
    
            const { id }=request.params;
    
    
            const book=await Book.findById(id);
        return response.status(200).json(book);
        } catch (error) {
            console.log(error);
        response.status(500).send({message:error.message})
        }
    });
    
    router.post("/",async (request,response)=>{
    try {
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        )
        {
            return response.status(400).send("Send all required fields:title,author,publishYear");
        }
    
        const newBook=
        {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        };
    
        const book=await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message})
    }
    });
    
    router.get("/",async (request,response)=>{
        try {
            const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
        } catch (error) {
            console.log(error);
        response.status(500).send({message:error.message})
        }
    });
    
    router.delete("/:id",async (request,response)=>{
        try {
    
            const { id }=request.params;
    
    
            const result=await Book.findByIdAndDelete(id);
    
            if(!result)
            {
                return response.status(404).send("Book is not found");
            }
        return response.status(200).send("Deleted");
        } catch (error) {
            console.log(error);
        response.status(500).send({message:error.message})
        }
    });
    
    router.put("/:id",async (request,response)=>{
        try {
            if(
                !request.body.title||
                !request.body.author||
                !request.body.publishYear
            )
            {
                return response.status(400).send("Send all required fields:title,author,publishYear");
            }
        
            
            const { id }=request.params;
    
            const updatingBook=
            {
                title:request.body.title,
                author:request.body.author,
                publishYear:request.body.publishYear
            };
    
            const book=await Book.findByIdAndUpdate(id,request.body);
            if(!book)
            {
                return response.status(404).send("Book is not found");
            }
            return response.status(200).send("Updated");
        } catch (error) {
            console.log(error);
            response.status(500).send({message:error.message})
        }
    });

    export default router;