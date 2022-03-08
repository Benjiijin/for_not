import {ApolloServer ,gql } from 'apollo-server';
import bcrypt from 'bcryptjs';

//schema
const users = [
    {name:"NOON", sex:"F", id: 0, password: "123"},
    {name:"FAH", sex:"F", id: 1, password: "456"},
    {name:"PRAN", sex:"F", id: 2, password: "789"},
    {name:"NOT", sex:"M", id: 3, password: "098"},
    {name:"JAME", sex:"M", id: 4, password: "765"},
    {name:"MODEL", sex:"M", id: 5, password: "432"},
];

const books = [
    {title: "The lord", userID:1, id: 0},
    {title: "The Of", userID:2, id: 1,},
    {title: "The Ring", userID:3, id: 2},
    {title: "The Thai", userID:4, id:3}
];

const location =[
    {contry: "Thailand", userID:0, id: 0},
    {contry: "Japan", userID:1, id: 1},
    {contry: "USA", userID:2, id: 2},
    {contry: "Korea", userID:3, id: 3},
    {contry: "Frane", userID:4, id: 4},
    {contry: "England", userID:5, id: 5}
];

const typeDefs = gql`
    type Query {
        hello: String
        hi: String
        password: String
        users:[User]
        user(name: String): User
    }
    type User {
        name: String
        sex: String
        password: String
        books: [Book]
        location: [Location]
    }
    type Book{
        id: ID
        name: String
        title: String
    }
    type Location{
        contry: String
    }
    type Mutation{
        addUser(name: String, sex: String): User
        createUser(name: String, password: String): User
        loginUser(name: String, password: String): String
    }
`;


//resover
const resolvers = {
    Query: {
        hello: (parent, args, context, info) => {
            return "world";
        },
        hi: (parent, args, context, info) => {
            return "62022765";
        },
        users: (parent, args, context, info) => {
            return users;
        },
        user: (parent, args, context, info) => {
            return users.find(user => user.name === args.name);
        }
    },
    User:{
        books: ({id},args,context,info)=>{
            return books.filter(book => book.userID == id);
        },
        location: ({id}, args, context, info) =>{
            return location.filter(location => location.userID == id);
        }
    },
    Mutation:{
        addUser: (parent,args,context,info)=>{
            const {name, sex} = args; //const name = args.name;

            //add info to database
            users.push({name: name, sex: sex});
            return {name: name, sex: sex};
        },
        createUser: (parent, args, context, info) =>{
            const {name, password} = args;
            const hashPassword =bcrypt.hashSync(password, 10);

            users.push({name: name, password: hashPassword});

            return {name: name, password: hashPassword};
        },
        loginUser: (parent, args, context) =>{
            const user = users.filter(user => user.name === args.name);

            const correct = bcrypt.compareSync(user.password, args.password);
            if(correct){
                return "correct";
            }
            return "Not correct";
        }
    }
};


//funsion apollo
const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({typeDefs,resolvers});
    const  { url } = await server.listen();
    console.log (`Server ready at ${url}`);

};

//call funsion
startApolloServer(typeDefs,resolvers);