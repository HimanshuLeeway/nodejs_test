const express = require("express");
const books = require("./books")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("app is listening to port 3000");
})

app.get("/",(req,res)=>{
    res.json("The get request is working ");
})

app.get("/books",(req,res)=>{
res.json(books);
})

app.post("/books",(req,res)=>{

const user = {
     id: books.length+1,
     bookName: req.body.bookName,
     bookAuthor:req.body.bookAuthor
}

books.push(user);
return res.status(201).json({ success:true, data: user});
})

app.get("/books/:id",(req,res)=>{
 
    const id =  req.params.id;    
    const index = books.findIndex((book)=>{
        return book.id === Number.parseInt(id);
    });
    
    if(index > 0){
        const bookData = books[index];
        console.log(bookData);
        res.json(bookData);
    }else{
        res.status(404);
    }
})

app.put("/books/:id",(req,res)=>{
  
    const id = req.params.id;
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;

    const index = books.findIndex((book)=>{
        return book.id == Number.parseInt(id);
    });
    
    if(index > 0){
        const bookData = books[index];
        bookData.bookName= bookName;
        bookData.bookAuthor= bookAuthor;
        console.log(bookData);
        res.json(bookData);
    }else{
        res.status(404);
    }
    
})

app.delete("/books/:id",(req,res)=>{
    const id = req.params.id;
    const index = books.findIndex((book)=>{
        return book.id == Number.parseInt(id);
    });

    if(index>0)
    {
        const bookData = books[index];
        books.splice(index,1);
        res.json(bookData);
    }else{
        res.status(404);
    }

    
})
