const express =  require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose'); // conectin to database
const Contact = require('./models/contact'); // connecting to schema

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: "Laksh",
//         phone: "9582785571"
//     },
//     {
//         name: "Aanchal",
//         phone: "8800985082"
//     },
//     {
//         name: "Aarush",
//         phone: "9315366649"
//     }
// ];

app.get('/', function(req, res){
    // res.send('<h1>Server running</h1>'); 

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', { 
            title: 'Contacts List',
            contact_list: contacts
        });
    });

    // return res.render('home', { 
    //     title: "I am flying",
    //     contact_list: contactList
    // });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Ola"
    });
});

app.post('/create-contact', function(req, res){
    // no need to push in variable anymore
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create(req.body , function(err, newContact){ // callback function to check for error
        if(err){
            console.log('Error in creating Contact');
            return;
        }
        console.log('*********', newContact);
        return res.redirect('back');
    });
});


app.get('/delete-contact/:_id', function(req, res){
    //get id from the url
    let id = req.params._id;
    //find contact in ddb using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from db');
            return;
        }
    });
    //go back
    return res.redirect('back');
});
// app.get('/delete-contact/:phone', function(req, res){
//     let phone = req.params.phone;
//     let contactIndex = contactList.findIndex(contact => contact.phone == phone); //return index if found else -1
//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }
//     return res.redirect('/');
// });

app.listen(port, function(err){
    if(err)
        console.log("Error in runnung the server", err);
    console.log("Express server is running on port", port);
});