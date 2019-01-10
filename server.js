//request package is used to make HTTP calls
let request = require("request");
let colors = require('colors');
//Global variables
let _data;
let _results;

//to get data from URL
request.get("https://interview.adpeai.com/api/v1/get-task", function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        //get the response body and parsing it into Json obj ans store in _data variable
        _data = JSON.parse(body)

        console.log("Data Received :".yellow + '\n' + JSON.stringify(_data));

        //based on data find out result
        switch (_data.operation) {
            case "addition":
                _results = _data.left + _data.right;
                break;
            case "subtraction":
                _results = _data.left - _data.right;
                break;
            case "multiplication":
                _results = _data.left * _data.right;
                break;
            case "remainder":
                _results = _data.left % _data.right;
                break;
            case "division":
                _results = _data.left / _data.right;
                break;
            default:
                _results = "That is an invalid operation!";
                break;
        }
        console.log('---Getting ID and Results---'.red)
        console.log("Id : ".yellow + _data.id + '\n' + "Result : ".yellow + _results);
        //making an obj to do post request.

        let options = {
            uri: 'https://interview.adpeai.com/api/v1/submit-task',
            method: 'POST',
            body: {
                "id": _data.id,
                "result": _results
            },
            json: true,
        };
        request(options,
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Post Success !".green)
                }
                else if (!error && response.statusCode === 400) {
                    console.log("Incorrect Value in result;no ID specified,value is invalid".red)
                }
                else if (!error && response.statusCode === 500) {
                    console.log("ID cannot be found".red)
                }else{
                    console.log("API not found ".red + error)
                }
            }
        );
    }else{
        if(response.statusCode === 404){
            console.log(response.statusCode +' - API not found'.red);
        }else if(response.statusCode === 400){
            console.log(response.statusCode +' - Bad Request'.red);
        }else{
            console.log(response.statusCode +' - Internal Server Error'.red);
        }
        
    }

})